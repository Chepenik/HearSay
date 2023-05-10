import React, { useState } from "react";

const VoteTile = ({ commentId }) => {
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);

  const handleVote = async (vote) => {
    if (!voted) {
      try {
        const response = await fetch(`/api/v1/votes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: vote, commentId: commentId }),
        });

        if (response.ok) {
          setVoted(true);
          setVoteCount((prevCount) => prevCount + vote);
        } else {
          console.error("Failed to vote on the comment:", response.statusText);
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
      }
    } else {
      // If the user has already voted, then we need to delete their vote.
      try {
        const response = await fetch(`/api/v1/votes/${commentId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setVoted(false);
          setVoteCount((prevCount) => prevCount - vote);
        } else {
          console.error("Failed to delete vote on the comment:", response.statusText);
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
      }
    }
  };

  const handleUpVote = () => {
    handleVote(1);
  };

  const handleDownVote = () => {
    handleVote(-1);
  };

  return (
    <div>
      <button onClick={handleUpVote}>⬆️</button>
      <span>{voteCount}</span>
      <button onClick={handleDownVote}>⬇️</button>
    </div>
  );
};

export default VoteTile;