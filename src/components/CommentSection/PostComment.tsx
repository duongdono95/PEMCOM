'use client';
import { customToast } from '@/hooks/toast/customToast';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { CommentRequest } from '@/lib/validators/comment';
import { Comment, CommentVote, User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MessageSquare } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { Buttons } from '../Buttons/Buttons';
import UserAvatar from '../UserAvatar/UserAvatar';
import CommentVotes from './CommentVotes';
type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
  postId: string;
}
const PostComment: React.FC<PostCommentProps> = ({ comment, votesAmt, currentVote, postId }) => {
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>(`@${comment.author.username}: `);
  const router = useRouter();
  useOnClickOutside(commentRef, () => {
    setIsReplying(false);
  });

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId };

      const { data } = await axios.patch(`/api/subreddit/post/comment/`, payload);
      return data;
    },

    onError: () => {
      return customToast.error("Something went wrong. Comment wasn't created successfully. Please try again.");
    },
    onSuccess: () => {
      router.refresh();
      setIsReplying(false);
    },
  });
  return (
    <div className="comment-container" ref={commentRef}>
      <div className="section-top">
        <div className="avatar">
          <UserAvatar image={comment.author.image} />
        </div>
        <div className="user-details">
          <b>u/{comment.author.username}</b>
          <p className="time">{comment.createdAt.toDateString()}</p>
        </div>
      </div>
      <div className="section-middle">
        <p className="comment-content">{comment.text}</p>
      </div>
      <div className="section-bottom">
        <CommentVotes commentId={comment.id} votesAmt={votesAmt} currentVote={currentVote} />

        <div
          className="reply-btn"
          onClick={() => {
            if (!session) return router.push('/sign-in');
            setIsReplying(true);
          }}
        >
          <MessageSquare size={16} />
          <p>Reply</p>
        </div>
      </div>
      {isReplying ? (
        <div className="reply-comment">
          <label className="replying-title" htmlFor="reply-comment">
            Replying <b>u/{comment.author.username}</b>
          </label>
          <div className="">
            <textarea
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
              }
              autoFocus
              id="reply-comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
              placeholder="What are your thoughts?"
            />

            <div className="buttons">
              <Buttons.general content="Cancel" tabIndex={-1} onClick={() => setIsReplying(false)} />

              <Buttons.general
                content="post"
                isLoading={isLoading}
                isPrimary
                onClick={() => {
                  if (!input) return;
                  postComment({
                    postId,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id, // default to top-level comment
                  });
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostComment;
