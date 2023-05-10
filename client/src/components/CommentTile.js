import React from "react";
import VoteTile from "./VoteTile";

const CommentTile = ({ comment }) => {
  const { id, comment: text, rating } = comment;

  return (
    <div className="comment-tile">
      <p>Rating: {rating}</p>
      <p>{text}</p>
      <VoteTile commentId={id} />
    </div>
  );
};

export default CommentTile;