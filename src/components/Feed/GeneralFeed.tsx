import React, { useEffect } from "react";
import Post from "../Post/Post";
import "./Feed.scss";
import { db } from "@/lib/db";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
const GeneralFeed = async () => {
  const getPosts = async () => {
    let fetchedPosts = [];
    return (fetchedPosts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        votes: true,
        author: true,
        comments: true,
        subreddit: true,
      },
      take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
    }));
  };
  const posts = getPosts();
  console.log(posts);
  return (
    <div className="GeneralFeed">
      {(await posts).map((post, index) => {
        return (
          <Post key={index} subredditName={post.subreddit.name} post={post} />
        );
      })}
    </div>
  );
};

export default GeneralFeed;
