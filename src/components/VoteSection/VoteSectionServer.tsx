import { getAuthSession } from "@/lib/auth";
import { Post, Vote } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Buttons } from "../Buttons/Buttons";
import "./VoteSection.scss";
import VoteSectionClient from "./VoteSectionClient";
interface VoteSectionServerProps {
  postId: string;
  initialVotesAmt?: number;
  initialVote?: Vote["type"] | null;
  getData?: () => Promise<
    (Post & { votes: Vote[] }) | null
  >;
}
const VoteSectionServer = async ({
  postId,
  initialVote,
  initialVotesAmt,
  getData,
}: VoteSectionServerProps) => {
  const session = await getAuthSession();
  let _votesAmt: number = 0;
  let _currentVote: Vote["type"] | null | undefined =
    undefined;

  if (getData) {
    // fetch data in component
    const post = await getData();
    if (!post) return notFound();

    _votesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;
      return acc;
    }, 0);

    _currentVote = post.votes.find(
      (vote) => vote.userId === session?.user?.id
    )?.type;
  } else {
    // passed as props
    _votesAmt = initialVotesAmt!;
    _currentVote = initialVote;
  }
  return (
    <div className="vote-section">
      <VoteSectionClient
        postId={postId}
        initialVotesAmt={_votesAmt}
        initialVote={_currentVote}
      />
    </div>
  );
};

export default VoteSectionServer;
