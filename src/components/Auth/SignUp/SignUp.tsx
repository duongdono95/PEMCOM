import { Buttons } from "@/components/Buttons/Buttons";
import CloseModal from "@/components/CloseModal";
import { Icons } from "@/Icons/Icons";
import Link from "next/link";
import React from "react";
import "./SignUp.scss";
const SignUp = ({ isModal }: { isModal?: boolean }) => {
  return (
    <div className="SignUp">
      {isModal && (
        <div className="close">
          <CloseModal />
        </div>
      )}
      <Icons.logo />
      <h2>Sign Up</h2>
      <p className="condition">
        By continuing, you are setting up a PemCom account
        and agree to our User Agreement and Privacy Policy.
      </p>
      <Buttons.google />
      <p>
        New to PemCom ?{" "}
        <span>
          <Link className="sign-up-link" href="/sign-in">
            Sign in
          </Link>
        </span>
      </p>
    </div>
  );
};

export default SignUp;
