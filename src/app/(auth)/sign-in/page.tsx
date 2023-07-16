import SignIn from "@/components/Auth/SignIn/SignIn";
import { Buttons } from "@/components/Buttons/Buttons";
import React from "react";
import "./style.scss";
const Page = () => {
  return (
    <div className="sign-in-page">
      <Buttons.backToHome />
      <div className="content">
        <SignIn />
      </div>
    </div>
  );
};

export default Page;
