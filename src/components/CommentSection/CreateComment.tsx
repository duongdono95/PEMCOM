'use client';
import { customToast } from '@/hooks/toast/customToast';
import { CommentRequest } from '@/lib/validators/comment';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { Send } from 'lucide-react';
import './CommentSection.scss';
import { Buttons } from '../Buttons/Buttons';

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

const CreateComment: FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();
  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId };

      const { data } = await axios.patch(`/api/subreddit/post/comment/`, payload);
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return customToast.login();
        }
      }

      return customToast.error("Something went wrong. Comment wasn't created successfully. Please try again.");
    },
    onSuccess: () => {
      router.refresh();
      setInput('');
    },
  });
  return (
    <div className="post-page-comment">
      <label htmlFor="comment">Your Comment</label>
      <div className="bottom">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="comment"
          rows={1}
          placeholder="What are your thoughts?"
        />
        <Buttons.sendBtn
          isLoading={isLoading}
          disabled={input.length === 0}
          onClick={() => comment({ postId, text: input, replyToId })}
        />
      </div>
    </div>
  );
};

export default CreateComment;
