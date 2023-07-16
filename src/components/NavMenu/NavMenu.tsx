import Link from "next/link";
import React from "react";
import "./NavMenu.scss";
const NavMenu = () => {
  return (
    <div className="NavMenu">
      <Link href="sign-in">Sign In</Link>
    </div>
  );
};

export default NavMenu;
