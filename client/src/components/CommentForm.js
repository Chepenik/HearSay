import React, { useState } from "react";
import CommentTile from "./CommentTile";

const CommentForm = ({ handleCommentSubmit, comments }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCommentSubmit(event, newComment);
    setNewComment("");
  };

  const commentList = comments && comments.length > 0 ? (
    comments.map((comment, index) => (
      <CommentTile key={comment.id} comment={comment} index={index} />
    ))
  ) : (
    <p>No comments yet.</p>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Add a comment:
          <input
            type="text"
            name="comment"
            value={newComment}
            onChange={handleCommentChange}
          />
        </label>
        <button type="submit" className="comment-btn">
          Submit
        </button>
      </form>
      <ul>{commentList}</ul>
    </div>
  );
};

export default CommentForm;
