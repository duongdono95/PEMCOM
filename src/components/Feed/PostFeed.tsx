import { ExtendedPost } from "@/types/db";
import React from "react";
import Post from "../Post/Post";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
}

const PostFeed: React.FC<PostFeedProps> = ({
  initialPosts,
}) => {
  return (
    <div className="post-feed">
      {initialPosts.map((post, index) => {
        return (
          <Post
            key={index}
            post={post}
            subredditName={post.subreddit.name}
          />
        );
      })}
    </div>
  );
};

export default PostFeed;
