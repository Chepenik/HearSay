import React, { useState } from "react";
import CommentTile from "./CommentTile";

const CommentForm = ({ handleCommentSubmit, comments }) => {
  const [newComment, setNewComment] = useState({
    rating: "",
    comment: "",
  });

  const handleCommentChange = (event) => {
    setNewComment({
      ...newComment,
      [event.currentTarget.name]: event.currentTarget.value
    })      
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handleCommentSubmit(event, newComment);
    // setNewComment("");
    handleCommentSubmit(event, newComment)
    setNewComment({
      ...newComment
    })
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
        <button type="submit" className="comment-btn">
          Submit
        </button>
      </form>
  );
};

export default CommentForm;
