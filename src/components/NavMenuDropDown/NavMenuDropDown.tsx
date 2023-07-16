"use client";
import {
  Group,
  LogOut,
  Newspaper,
  Search,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import GetWindowWidth from "@/helper/GetWindowWidth";
import { signOut } from "next-auth/react";
import "./NavMenuDropDown.scss";
const NavMenuDropDown = () => {
  const windowWidth = GetWindowWidth();
  const handleSignOut = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };
  return (
    <div tabIndex={10} className="dropdown-menu">
      <Link href="/setting" className="item">
        <span>
          <UserCircle size={20} />
        </span>
        User Profile
      </Link>
      {typeof windowWidth !== "undefined" ? (
        windowWidth < 500 ? (
          <Link href="/search" className="item">
            <span>
              <Search size={20} strokeWidth={2.75} />
            </span>
            Search
          </Link>
        ) : null
      ) : null}
      <Link href="/" className="item">
        <span>
          <Newspaper size={20} />
        </span>
        Feed
      </Link>
      <Link href="/r/create" className="item">
        <span>
          <Group size={20} />
        </span>
        Create Community
      </Link>

      <div
        onClick={(e) => handleSignOut(e)}
        className="item"
      >
        <span>
          <LogOut strokeWidth={2.75} size={20} />
        </span>
        Sign Out
      </div>
    </div>
  );
};

export default NavMenuDropDown;
