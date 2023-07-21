'use client';
import { customToast } from '@/hooks/toast/customToast';
import { VoteType } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { usePrevious } from '@mantine/hooks';
import { Buttons } from '../Buttons/Buttons';
import './VoteSection.scss';
import { useMutation } from '@tanstack/react-query';
import { PostVoteRequest } from '@/lib/validators/vote';
interface VoteSectionProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}
const VoteSectionClient = ({ postId, initialVotesAmt, initialVote }: VoteSectionProps) => {
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  // ensure sync with server
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: type,
        postId: postId,
      };

      await axios.patch('/api/subreddit/post/vote', payload);
    },
    onError: (err, voteType) => {
      if (voteType === 'UP') setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);

      // reset current vote
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return customToast.login();
        }
      }

      return customToast.error('Something went wrong. Your vote was not registered. Please try again');
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === 'UP') setVotesAmt((prev) => prev - 1);
        else if (type === 'DOWN') setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type);
        if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === 'DOWN') setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });
  return (
    <div className="vote-section">
      <Buttons.voteUp onClick={() => vote('UP')} currentVote={currentVote} />
      <p> {votesAmt > 0 ? votesAmt : 0}</p>
      <Buttons.voteDown onClick={() => vote('DOWN')} currentVote={currentVote} />
    </div>
  );
};

export default VoteSectionClient;
