import React from "react";

const CommentTile = ({ comment }) => {
  const { id, comment: text, userId, websiteId, createdAt } = comment;

  return (
    <div className="comment-tile">
      <p>{text}</p>
      <p>Posted by user id {userId} on website id {websiteId}</p>
      <p>Posted at: {createdAt}</p>
    </div>
  );
};

export default CommentTile;
