import { ExtendedPost } from "@/types/db";
import Link from "next/link";
import React from "react";
import CommentSection from "../CommentSection/CommentSection";
import EditorOutput from "../Editor/EditorOutput";
import VoteSection from "../VoteSection/VoteSection";
import "./Post.scss";

interface PostProps {
  post: ExtendedPost;
  subredditName: string;
}

const Post: React.FC<PostProps> = ({ post, subredditName }) => {
  return (
    <div className="Post">
      <div className="post-detail">
        <div className="post-vote">
          <VoteSection />
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
            <div className="time">{post?.createdAt.toDateString()}</div>
          </div>
          <Link href={`/r/${subredditName}/post/${post.id}`}>
            <div className="info-item post-content">
              <EditorOutput content={post?.content} />
            </div>
          </Link>
        </div>
      </div>
      <div className="post-comment">
        <CommentSection />
      </div>
    </div>
  );
};

export default Post;
