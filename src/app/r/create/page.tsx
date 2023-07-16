"use client";
import { Buttons } from "@/components/Buttons/Buttons";
import Input from "@/components/UI/TextInput/Input";
import { customToast } from "@/hooks/toast/customToast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./styles.scss";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { CreateSubredditPayload } from "@/lib/validators/subreddit";
const page = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const { mutate: createCommunity, isLoading } =
    useMutation({
      mutationFn: async () => {
        const payload: CreateSubredditPayload = {
          name: input,
        };

        const { data } = await axios.post(
          "/api/subreddit",
          payload
        );
        return data as string;
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 409) {
            return customToast.error(
              "Subreddit already exists. Please choose a different name."
            );
          }

          if (err.response?.status === 422) {
            return customToast.error(
              "Invalid subreddit name. Please choose a name between 3 and 21 letters."
            );
          }

          if (err.response?.status === 401) {
            return customToast.login();
          }
        }

        customToast.error(
          "There was an error. Could not create subreddit."
        );
      },
      onSuccess: (data) => {
        router.push(`/r/${data}`);
      },
    });
  return (
    <div className="r-create">
      <div className="back-home">
        <Buttons.backToHome />
      </div>
      <div className="create-box">
        <h2>Create a Community</h2>
        <h3>Name</h3>
        <p>
          Community names including capitalization cannot be
          changed.
        </p>
        <Input
          label="r/"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="buttons">
          <Buttons.general
            content="Cancel"
            onClick={() => router.back()}
          />
          <Buttons.general
            isPrimary
            content="Create Community"
            onClick={() => createCommunity()}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
