import { Icons } from "@/Icons/Icons";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import NavMenu from "../NavMenu/NavMenu";
import NavUserAccount from "../NavUserAccount/NavUserAccount";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.scss";
const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="Navbar">
      <div className="navbar-item">
        <Icons.logo />
      </div>
      <div className="navbar-item">
        <SearchBar />
      </div>
      <div className="navbar-item">
        {session ? (
          <NavUserAccount user={session?.user} />
        ) : (
          <NavMenu />
        )}
      </div>
    </div>
  );
};

export default Navbar;
