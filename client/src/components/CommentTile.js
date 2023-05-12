import React from "react";
import { Link } from "react-router-dom"

const CommentTile = ({ comment, handleCommentDelete, currentUser}) => {
  const { id, comment: text, rating, userId } = comment;

  const handleClickDelete = () => {
    handleCommentDelete(id)
  }

  const isAdmin = currentUser && currentUser.admin === true
  const isSameUser = currentUser && currentUser.id === userId

  return (
    <div className="comment-tile">
      <p>Rating: {rating}</p>
      <p>{text}</p>
      {(isSameUser || isAdmin) && (
        <> 
        <i type="button" className="fa-regular fa-trash-can editDelete" onClick={handleClickDelete}></i>
        <Link to={`/comments/${id}/edit`}> <i className="fa-solid fa-pencil editDelete"></i>
        </Link> 
        </>
      )}
    </div>
  );
};

export default CommentTile

