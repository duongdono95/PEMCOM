"use client";

import { customToast } from "@/hooks/toast/customToast";
import { toast } from "react-toastify";

export default function Home() {
  const test = () => {
    customToast.login;
  };
  return (
    <main>
      <button onClick={() => test()}>click me</button>
    </main>
  );
}
