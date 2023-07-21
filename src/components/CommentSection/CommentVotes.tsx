import { CommentVote, VoteType } from '@prisma/client';
import React, { FC, useState } from 'react';
import { Buttons } from '../Buttons/Buttons';
import { usePrevious } from '@mantine/hooks';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { CommentVoteRequest } from '@/lib/validators/vote';
import { customToast } from '@/hooks/toast/customToast';
import './CommentSection.scss';
interface CommentVotesProps {
  commentId: string;
  votesAmt: number;
  currentVote?: PartialVote;
}

type PartialVote = Pick<CommentVote, 'type'>;
const CommentVotes: FC<CommentVotesProps> = ({ commentId, votesAmt: _votesAmt, currentVote: _currentVote }) => {
  const [votesAmt, setVotesAmt] = useState<number>(_votesAmt);
  const [currentVote, setCurrentVote] = useState<PartialVote | undefined>(_currentVote);
  const prevVote = usePrevious(currentVote);
  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: CommentVoteRequest = {
        voteType: type,
        commentId,
      };

      await axios.patch('/api/subreddit/post/comment/vote', payload);
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

      return customToast.error('Something went wrong. Your vote was not registered. Please try again.');
    },
    onMutate: (type: VoteType) => {
      if (currentVote?.type === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === 'UP') setVotesAmt((prev) => prev - 1);
        else if (type === 'DOWN') setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote({ type });
        if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === 'DOWN') setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });
  return (
    <div className="comment-votes">
      <Buttons.voteUp onClick={() => vote('UP')} currentVote={currentVote?.type} />
      <p>{votesAmt}</p>
      <Buttons.voteDown onClick={() => vote('DOWN')} currentVote={currentVote?.type} />
    </div>
  );
};

export default CommentVotes;
