"use client";
import { Buttons } from "@/components/Buttons/Buttons";
import CloseModal from "@/components/CloseModal";
import { Icons } from "@/Icons/Icons";
import Link from "next/link";
import React from "react";
import "./SignIn.scss";
import { signIn } from "next-auth/react";
import { customToast } from "@/hooks/toast/customToast";
const SignIn = ({ isModal }: { isModal?: boolean }) => {
  const loginWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      customToast.error(
        "There was an error logging in with Google"
      );
    }
  };
  return (
    <div className="SignIn">
      {isModal && (
        <div className="close">
          <CloseModal />
        </div>
      )}
      <Icons.logo />
      <h2>Welcome Back</h2>
      <p className="condition">
        By continuing, you are setting up a PemCom account
        and agree to our User Agreement and Privacy Policy.
      </p>
      <div onClick={loginWithGoogle}>
        <Buttons.google />
      </div>
      <p>
        New to PemCom ?{" "}
        <span>
          <Link className="sign-up-link" href="/sign-up">
            Sign up
          </Link>
        </span>
      </p>
    </div>
  );
};

export default SignIn;
