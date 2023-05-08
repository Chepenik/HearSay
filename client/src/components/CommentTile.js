import React from "react";

const CommentTile = ({ comment }) => {
  const { comment: text, rating } = comment;

  return (
    <div className="comment-tile">
      <p>Rating: {rating}</p>
      <p>{text}</p>
    </div>
  );
};

export default CommentTile;
