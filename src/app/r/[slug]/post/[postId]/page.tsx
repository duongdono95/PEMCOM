import { Buttons } from '@/components/Buttons/Buttons';
import EditorOutput from '@/components/Editor/EditorOutput';
import VoteSectionServer from '@/components/VoteSection/VoteSectionServer';
import './styles.scss';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';
import { CachedPost } from '@/types/redis';
import { Post, User, Vote } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import CommentSection from '@/components/CommentSection/CommentSection';
interface SubRedditPostPageProps {
  params: {
    postId: string;
  };
}

const page = async ({ params }: SubRedditPostPageProps) => {
  const cachedPost = (await redis.hgetall(`post:${params.postId}`)) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  }

  if (!post && !cachedPost) return notFound();
  return (
    <div className="subreddit-post-page">
      <div className="left">
        <Suspense fallback={<PostVoteShell />}>
          {/* @ts-expect-error server component */}
          <VoteSectionServer
            postId={post?.id ?? cachedPost.id}
            getData={async () => {
              return await db.post.findUnique({
                where: {
                  id: params.postId,
                },
                include: {
                  votes: true,
                },
              });
            }}
          />
        </Suspense>
      </div>
      <div className="right">
        <div className="top">
          <p className="author">
            Posted by <b>u/{post?.author.username ?? cachedPost.authorUsername}</b>
          </p>
          <p className="time">{post?.createdAt.toString() ?? cachedPost.createdAt.toString()}</p>
        </div>
        <h3 className="title">{post?.title ?? cachedPost.title}</h3>
        <div className="content">
          <EditorOutput content={post?.content ?? cachedPost.content} />
        </div>
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          {/* @ts-expect-error Server Component */}
          <CommentSection postId={post?.id ?? cachedPost.id} />
        </Suspense>
      </div>
    </div>
  );
};

const PostVoteShell = () => {
  return (
    <div className="vote-section">
      <Buttons.voteUp />
      <Loader2 size={20} className=" animate-spin" />
      <Buttons.voteDown />
    </div>
  );
};

export default page;
