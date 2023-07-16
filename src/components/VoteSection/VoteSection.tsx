import React from "react";
import { Buttons } from "../Buttons/Buttons";
import "./VoteSection.scss";
const VoteSection = () => {
  return (
    <div className="vote-section">
      <Buttons.voteUp />
      <p>0</p>
      <Buttons.voteDown />
    </div>
  );
};

export default VoteSection;
