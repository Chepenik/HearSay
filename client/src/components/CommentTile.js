import React from "react";

const CommentTile = ({ comment, index }) => {
  const { comment: text } = comment;

  return (
    <div className="comment-tile">
      <p>{text}</p>
    </div>
  );
};

export default CommentTile;
