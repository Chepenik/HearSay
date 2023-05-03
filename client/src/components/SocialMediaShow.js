import React, { useState, useEffect } from "react";
import CommentTile from "./CommentTile";

const SocialMediaShow = props => {
  const [socialMediaShow, setSocialMediaShow] = useState({
    name: "",
    url: "",
    description: "",
  });

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const getSocialMedia = async () => {
    const socialMediaId = props.match.params.id;
    try {
      const response = await fetch(`/api/v1/websites/${socialMediaId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setSocialMediaShow(body.website);
      setComments(body.comments);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const renderComments = () => {
    if (comments && comments.length > 0) {
      return comments.map((comment) => (
        <CommentTile key={comment.id} comment={comment} />
      ));
    } else {
      return <p>No comments yet.</p>;
    }
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/v1/websites/${socialMediaShow.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: newComment,
      }),
    });
    if (response.ok) {
      const comment = await response.json();
      setComments([...comments, comment]);
      setNewComment("");
    } else {
      console.error("Failed to add comment:", response.statusText);
    }
  };

  useEffect(() => {
    getSocialMedia();
  }, []);

  return (
    <div className="show-page">
      <h2 className="show-title">{socialMediaShow.name}</h2>
      <a href={socialMediaShow.url} target="_blank" rel="noreferrer">
        Check Out The Platform
      </a>
      <p>{socialMediaShow.description}</p>
      <form onSubmit={handleCommentSubmit}>
        <label>
          Add a comment:
          <input type="text" name="comment" value={newComment} onChange={handleCommentChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul>{renderComments()}</ul>
    </div>
  );
};

export default SocialMediaShow;
