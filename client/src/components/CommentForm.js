import React, { useState } from "react";

const CommentForm = ({ handleCommentSubmit, comments }) => {
  const [newComment, setNewComment] = useState({
    rating: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});

  const handleCommentChange = (event) => {
    setNewComment({
      ...newComment,
      [event.currentTarget.name]: event.currentTarget.value
    })      
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== "") {
      // handleCommentSubmit(event, newComment);
      // setNewComment("");
    handleCommentSubmit(event, newComment)
    setNewComment({
      ...newComment
    })
      setErrors({});
    } else {
      setErrors({ comment: "Error: Comment cannot be empty." });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>
          Rate the site:
          <input
            type="text"
            name="rating"
            value={newComment.rating}
            onChange={handleCommentChange}
          />  
        </label>

      <label>
        Add a comment:
        <input
          type="text"
          name="comment"
          value={newComment.comment}
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