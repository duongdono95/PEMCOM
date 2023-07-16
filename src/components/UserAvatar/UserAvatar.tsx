"use client";
import React from "react";
import AvatarFallBack from "./AvatarFallBack";
import "./UserAvatar.scss";
interface Props {
  image: string | null;
  name?: string | null;
  isOnline?: boolean;
}
const UserAvatar: React.FC<Props> = ({
  image,
  name,
  isOnline,
}) => {
  return (
    <div className="user-avatar">
      {image ? (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="image"
          tabIndex={-1}
        >
          {isOnline && <div className="online"></div>}
        </div>
      ) : (
        <AvatarFallBack />
      )}
      {name && (
        <div className="user-name">
          <p>{name}</p>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
