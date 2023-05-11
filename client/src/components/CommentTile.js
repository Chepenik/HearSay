import React from "react";
import { Link } from "react-router-dom"

const CommentTile = ({ comment, handleCommentDelete, currentUser}) => {
  const { id, comment: text, rating, userId } = comment;

  const handleClickDelete = () => {
    handleCommentDelete(id)
  }

  console.log(currentUser)

  const isAdmin = currentUser && currentUser.admin === true
  const isSameUser = currentUser && currentUser.id === userId

  return (
    <div className="comment-tile">
      <p>Rating: {rating}</p>
      <p>{text}</p>
      {(isSameUser || isAdmin) && (
        <> 
        <button type="delete" onClick={handleClickDelete}>Delete</button>
        <br></br>
        <Link to={`/comments/${id}/edit`} className="social-media-item">
          <p>Edit Your Comment</p>
        </Link>
        </>
      )}
    </div>
  )
}

export default CommentTile

