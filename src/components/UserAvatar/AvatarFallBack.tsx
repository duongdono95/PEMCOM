import React from "react";
import { User } from "lucide-react";
import "./UserAvatar.scss";
const AvatarFallBack = () => {
  return (
    <div className="avatar-fall-back">
      <User color="white" size={28} />
    </div>
  );
};

export default AvatarFallBack;
