"use client";
import Link from "next/link";
import { Buttons } from "@/components/Buttons/Buttons";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";
import "./customToast.scss";
const LoginToast = () => (
  <div className="login-toast">
    <h3>Login is required</h3>
    <p>Please Login to continue the action</p>
    <Link href="/sign-in">
      <Buttons.general content="Login" />
    </Link>
  </div>
);

export const customToast = {
  login: toast(LoginToast),
};
