import SignUp from "@/components/Auth/SignUp/SignUp";
import { Buttons } from "@/components/Buttons/Buttons";
import React from "react";
import "./style.scss";
const Page = () => {
  return (
    <div className="sign-up-page">
      <Buttons.backToHome />
      <div className="content">
        <SignUp />
      </div>
    </div>
  );
};

export default Page;
