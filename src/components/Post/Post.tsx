'use client';
import { ExtendedPost } from '@/types/db';
import Link from 'next/link';
import React, { useRef } from 'react';
import CommentSection from '../CommentSection/CommentSection';
import EditorOutput from '../Editor/EditorOutput';
import VoteSectionClient from '../VoteSection/VoteSectionClient';
import { Post, User, Vote } from '@prisma/client';
import VoteSection from '../VoteSection/VoteSectionClient';
import './Post.scss';
import { MessageSquare } from 'lucide-react';
import { formatTimeToNow } from '@/lib/utils';

type PartialVote = Pick<Vote, 'type'>;
interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmt: number;
  subredditName: string;
  currentVote?: PartialVote;
  commentAmt: number;
}

const Post: React.FC<PostProps> = ({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  subredditName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  console.log(pRef.current?.clientHeight);
  return (
    <div className="Post">
      <div ref={pRef} className="post-detail">
        {pRef.current?.clientHeight && pRef.current?.clientHeight > 135 ? (
          // blur bottom if content is too long
          <div className="filter"></div>
        ) : null}
        <div className="post-vote">
          <VoteSectionClient postId={post.id} initialVotesAmt={_votesAmt} initialVote={_currentVote?.type} />
        </div>
        <div className="post-info">
          <div className="info-item">
            <Link href={`/r/${subredditName}`} className="community-name">
              <p className="prefix">r/</p>
              <p>{subredditName}</p>
            </Link>
            <p>•</p>
            <div className="author">
              <p className="prefix">Posted By:</p>
              <p>{post?.author.name}</p>
            </div>
            <p>•</p>
            <div className="time">{formatTimeToNow(new Date(post?.createdAt.toString()))}</div>
          </div>
          <Link href={`/r/${subredditName}/post/${post.id}`}>
            <div className="info-item post-content">
              <EditorOutput content={post?.content} />
            </div>
          </Link>
        </div>
      </div>
      <Link href={`/r/${subredditName}/post/${post.id}`}>
        <div className="post-comment">
          <div className="section-left">
            <MessageSquare />
          </div>
          <div className="section-right">
            <p className="amount">0</p>
            <p>comments</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
