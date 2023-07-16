import Link from "next/link";
import React from "react";
import CommentSection from "../CommentSection/CommentSection";
import VoteSection from "../VoteSection/VoteSection";
import "./Post.scss";
const Post = () => {
  return (
    <div className="Post">
      <div className="post-detail">
        <div className="post-vote">
          <VoteSection />
        </div>
        <div className="post-info">
          <div className="info-item">
            <Link href="/" className="community-name">
              <p className="prefix">r/</p>
              <p>don123123</p>
            </Link>
            <p>•</p>
            <div className="author">
              <p className="prefix">Posted By:</p>
              <p>u/7WrpGBo1K_</p>
            </div>
            <p>•</p>
            <div className="time">1d ago</div>
          </div>
          <div className="info-item post-content">
            <h3>Post Title</h3>
            <p>Post content</p>
          </div>
        </div>
      </div>
      <div className="post-comment">
        <CommentSection />
      </div>
    </div>
  );
};

export default Post;
