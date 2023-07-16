import PostFeed from "@/components/Feed/PostFeed";
import MiniCreatePost from "@/components/MiniCreatePost/MiniCreatePost";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import "./styles.scss";
interface PageProps {
  params: {
    slug: string;
  };
}
const page = async ({ params }: PageProps) => {
  const { slug } = params;
  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });
  if (!subreddit) return notFound();
  const session = await getAuthSession();
  return (
    <div className="r-slug-page">
      <MiniCreatePost session={session} />
      <PostFeed
        initialPosts={subreddit.posts}
        subredditName={subreddit.name}
      />
    </div>
  );
};

export default page;
