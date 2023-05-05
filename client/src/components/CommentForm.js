import React, { useState } from "react";

const CommentForm = ({ handleCommentSubmit, comments }) => {
  const [newComment, setNewComment] = useState("");
  const [errors, setErrors] = useState({});

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== "") {
      handleCommentSubmit(event, newComment);
      setNewComment("");
      setErrors({});
    } else {
      setErrors({ comment: "Error: Comment cannot be empty." });
    }
  };

  return (
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
      {errors.comment && <div className="error">{errors.comment}</div>}
      <button type="submit" className="comment-btn">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;