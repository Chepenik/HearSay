import React from "react";

const CommentTile = ({ comment, handleCommentDelete }) => {
  const { id, comment: text } = comment;

  const handleClick = () => {
    console.log("test")
    handleCommentDelete(id)
  }

  return (
    <div className="comment-tile">
      <p>{text}</p>
      <button type="delete" onClick={handleClick}>Delete</button>
    </div>
  );
};

export default CommentTile;
