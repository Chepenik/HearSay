import React from "react";

const CommentForm = ({ newComment, handleCommentChange, handleCommentSubmit }) => {
  return (
    <form onSubmit={handleCommentSubmit}>
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
  );
};

export default CommentForm;
