import { MessageSquare } from "lucide-react";
import React from "react";
import "./CommentSection.scss";
const CommentSection = () => {
  return (
    <div className="comment-section">
      <div className="section-left">
        <MessageSquare />
      </div>
      <div className="section-right">
        <p className="amount">0</p>
        <p>comments</p>
      </div>
    </div>
  );
};

export default CommentSection;
