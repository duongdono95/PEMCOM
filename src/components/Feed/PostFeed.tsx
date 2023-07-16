import { ExtendedPost } from "@/types/db";
import React from "react";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName?: string;
}

const PostFeed: React.FC<PostFeedProps> = () => {
  return <div>PostFeed</div>;
};

export default PostFeed;
