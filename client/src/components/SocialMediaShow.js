import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentTile from "./CommentTile";

const SocialMediaShow = (props) => {
  const [socialMediaShow, setSocialMediaShow] = useState({
    id: "",
    name: "",
    url: "",
    description: "",
  });

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ rating: "", comment: "" })


  const getSocialMedia = async () => {
    const socialMediaId = props.match.params.id
    try {
      const response = await fetch(`/api/v1/websites/${socialMediaId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setSocialMediaShow(body.website)
      setComments(body.website.comments)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  };

  useEffect(() => {
    getSocialMedia()
  }, [])

  const handleCommentSubmit = async (event, newComment) => {
    event.preventDefault()
    newComment.rating = parseFloat(newComment.rating)
  
    try {
      const response = await fetch(`/api/v1/websites/${socialMediaShow.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      });
  
      if (response.ok) {
        const body = await response.json()
        setComments([...comments, body.comment])
        setNewComment({ rating: "", comment: "" })
      } else {
        console.error("Failed to add comment:", response.statusText)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  

  const commentList = comments && comments.length > 0 ? (
    comments.map((comment, index) => (
      <CommentTile key={comment.id} comment={comment} index={index} rating={comment.rating}/>
    ))
  ) : (
    <p>No comments yet.</p>
  );

  return (
    <div className="show-page">
      <h2 className="show-title">{socialMediaShow.name}</h2>
      <a href={socialMediaShow.url} target="_blank" rel="noreferrer">
        Check Out The Platform
      </a>
      <p>{socialMediaShow.description}</p>
      <CommentForm handleCommentSubmit={handleCommentSubmit} />
      <ul>{commentList}</ul>
    </div>
  );
};

export default SocialMediaShow;