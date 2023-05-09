import React from "react";

const CommentTile = ({ comment, handleCommentDelete }) => {
  const { id, comment: text, rating } = comment;

  const handleClick = () => {
    console.log("test")
    handleCommentDelete(id)
  }

  return (
    <div className="comment-tile">
      <p>Rating: {rating}</p>
      <p>{text}</p>
      <button type="delete" onClick={handleClick}>Delete</button>
    </div>
  );
};

export default CommentTile;
