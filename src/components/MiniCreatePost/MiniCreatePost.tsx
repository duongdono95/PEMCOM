"use client";
import { getAuthSession } from "@/lib/auth";
import { usePathname } from "next/navigation";
import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import type { Session } from "next-auth";
import { Image, Link } from "lucide-react";
import "./MiniCreatePost.scss";
import { useRouter } from "next/navigation";
interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: React.FC<MiniCreatePostProps> = ({
  session,
}) => {
  const pathName = usePathname();
  console.log(session);
  const router = useRouter();
  return (
    <div
      className="mini-create-post"
      onClick={() => router.push(pathName + "/submit")}
    >
      <div>
        <UserAvatar
          image={
            session?.user.image ? session?.user.image : ""
          }
          isOnline={session?.user ? true : false}
        />
      </div>
      <div className="group">
        <div className="item">
          <p>Create Post</p>
        </div>
        <div className="item">
          <Image size={22} strokeWidth={2.5} />
        </div>
        <div className="item">
          <Link size={22} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default MiniCreatePost;
