import React from "react";
import { Link } from "react-router-dom"

const CommentTile = ({ comment, handleCommentDelete, currentUser}) => {
  const { id, comment: text, rating } = comment;

  const handleClickDelete = () => {
    handleCommentDelete(id)
  }

  return (
    <div className="comment-tile">
      <p>Rating: {rating}</p>
      <p>{text}</p>
      {currentUser && currentUser.id === comment.userId && (
      <> 
      <button type="delete" onClick={handleClickDelete}>Delete</button>
      <br></br>
      <Link to={`/comments/${id}/edit`} className="social-media-item">
        <p>Edit Your Comment</p>
      </Link>
      </>
      )}
    </div>
  );
};

export default CommentTile;