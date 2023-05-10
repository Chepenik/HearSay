import React from "react";
import { Link } from "react-router-dom"
// import { Website } from "../../../server/src/models";
// import SocialMediaTile from "./SocialMediaTile";

const CommentTile = ({ comment, handleCommentDelete, handleCommentEdit }) => {
  const { id, comment: text, rating } = comment;

  const handleClickDelete = () => {
    handleCommentDelete(id)
  }

  const handleClickEdit = () => {
    handleCommentEdit(id, "hello!")
  }

  return (
    <div className="comment-tile">
      <p>Rating: {rating}</p>
      <p>{text}</p>
      <button type="delete" onClick={handleClickDelete}>Delete</button>
      <br></br>
      <Link to={`/websites/${id}/edit`} className="social-media-item">
        <p>Edit Your Comment</p>
      </Link>
    </div>
  );
};

export default CommentTile;