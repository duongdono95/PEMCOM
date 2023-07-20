import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { CachedPost } from "@/types/redis";
import { Post, User, Vote } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface SubRedditPostPageProps {
  params: {
    postId: string;
  };
}

const page: React.FC<SubRedditPostPageProps> = ({ params }) => {
  const fetchedPost = async () => {
    let post = null;
    const cachedPost = (await redis.hgetall(
      `post:${params.postId}`
    )) as CachedPost;

    if (cachedPost) {
      return cachedPost;
    }

    if (!cachedPost) {
      return (post = await db.post.findFirst({
        where: {
          id: params.postId,
        },
        include: {
          votes: true,
          author: true,
        },
      }));
    }
    if (!post && !cachedPost) return notFound();
  };
  console.log(fetchedPost);
  // if (!post && !cachedPost) return notFound();
  return (
    <div className="subreddit-post-page">
      <p>Posted By r/</p>
    </div>
  );
};

export default page;
