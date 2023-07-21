'use client';
import Link from 'next/link';
import { toast } from 'react-toastify';
import './customToast.scss';
const LoginToast = () => (
  <div className="login-toast">
    <h3>Login is required</h3>
    <p>Please Login to continue the action</p>
    <Link className="login-btn" href="/sign-in">
      Login
    </Link>
  </div>
);

export const customToast = {
  login: () => toast.warning(LoginToast),
  error: (message: string) => toast.error(message),
  success: (message: string) => toast.success(message),
  warning: (message: string) => toast.warning(message),
};
