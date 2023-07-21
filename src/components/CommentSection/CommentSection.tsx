import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Comment, CommentVote, User } from '@prisma/client';
import React from 'react';
import './CommentSection.scss';
import CreateComment from './CreateComment';
import PostComment from './PostComment';
type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
  replies: ReplyComment[];
};

type ReplyComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface CommentsSectionProps {
  postId: string;
  comments: ExtendedComment[];
}
const CommentSection = async ({ postId }: CommentsSectionProps) => {
  const session = await getAuthSession();
  const comments = await db.comment.findMany({
    where: {
      postId: postId,
      replyToId: null, // only fetch top-level comments
    },
    include: {
      author: true,
      votes: true,
      replies: {
        // first level replies
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });
  return (
    <div className="comment-section">
      <CreateComment postId={postId} />
      <div className="comment-list">
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment) => {
            const topLevelCommentVotesAmt = topLevelComment.votes.reduce((acc, vote) => {
              if (vote.type === 'UP') return acc + 1;
              if (vote.type === 'DOWN') return acc - 1;
              return acc;
            }, 0);

            const topLevelCommentVote = topLevelComment.votes.find((vote) => vote.userId === session?.user.id);

            return (
              <div key={topLevelComment.id} className="individual-comment">
                <PostComment
                  comment={topLevelComment}
                  currentVote={topLevelCommentVote}
                  votesAmt={topLevelCommentVotesAmt}
                  postId={postId}
                />

                {/* Render replies */}
                {topLevelComment.replies
                  .sort((a, b) => b.votes.length - a.votes.length) // Sort replies by most liked
                  .map((reply) => {
                    const replyVotesAmt = reply.votes.reduce((acc, vote) => {
                      if (vote.type === 'UP') return acc + 1;
                      if (vote.type === 'DOWN') return acc - 1;
                      return acc;
                    }, 0);

                    const replyVote = reply.votes.find((vote) => vote.userId === session?.user.id);

                    return (
                      <div key={reply.id} className="reply-comment">
                        <PostComment comment={reply} currentVote={replyVote} votesAmt={replyVotesAmt} postId={postId} />
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentSection;
