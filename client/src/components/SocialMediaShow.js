import React, { useState, useEffect } from "react"
import CommentForm from "./CommentForm"
import CommentTile from "./CommentTile"

const SocialMediaShow = (props) => {
  const [socialMediaShow, setSocialMediaShow] = useState({
    id: "",
    name: "",
    imageUrl: "",
    url: "",
    description: "",
    comments: [],
  })

  const [commentState, setCommentState] = useState({
    rating: 1,
    comment: "",
});

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
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };
  
  useEffect(() => {
    getSocialMedia()
  }, [])

  const handleCommentSubmit = async (event, newComment) => {
    event.preventDefault()
    newComment.rating = parseFloat(newComment.rating)

    try {
      const response = await fetch(
        `/api/v1/websites/${socialMediaShow.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: newComment }),
        }
      )

      if (response.ok) {
        const body = await response.json()
        setSocialMediaShow({
          ...socialMediaShow,
          comments: [...socialMediaShow.comments, body.comment],
        })
      } else {
        console.error("Failed to add comment:", response.statusText)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleCommentDelete = async (commentId) => {
    try { 
      const response = await fetch(`/api/v1/websites/${socialMediaShow.id}/comments/${commentId}`, { method: "DELETE" })  
      const filteredComments = socialMediaShow.comments.filter((comment) => {
        if (comment.id !== commentId) {
          return comment
        }
      })
      setSocialMediaShow({
        ...socialMediaShow,
        comments: filteredComments
      })
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
}
  }

const handleCommentEdit = async (commentId, updatedCommentData) => {
    try { 
      const response = await fetch(
        `/api/v1/websites/${socialMediaShow.id}/comments/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCommentData),
        }
      );  
      if (response.ok) {
        const updatedComments = socialMediaShow.comments.map((comment) =>
          comment.id === commentId ? { ...comment, ...updatedCommentData } : comment
        )
      } else {
        console.error("Failed to update comment:", response.statusText)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  const averagePepperRating =
    socialMediaShow.comments.length > 0
      ? (
          socialMediaShow.comments.reduce(
            (sum, comment) => sum + comment.rating,
            0
          ) / socialMediaShow.comments.length
        ).toFixed(1)
      : "-"

  const commentList =
    socialMediaShow.comments.length > 0 ? (
      socialMediaShow.comments.map((comment) => (
        <CommentTile
          key={comment.id}
          comment={comment}
          rating={comment.rating}
          handleCommentDelete={handleCommentDelete}
          handleCommentEdit={handleCommentEdit}
          currentUser={props.currentUser}
        />
      ))
    ) : (
      <p>No comments yet.</p>
    )

  return (
    <div className="show-page">
      <h2 className="show-title">{socialMediaShow.name}</h2>
      <img src={socialMediaShow.imageUrl} alt={socialMediaShow.name} />
      <div>Average Pepper Rating: {averagePepperRating}🌶️</div>
      <a href={socialMediaShow.url} target="_blank" rel="noreferrer">
        Check Out The Platform
      </a>
      <p>{socialMediaShow.description}</p>
      <CommentForm
        handleCommentSubmit={handleCommentSubmit}
        comments={socialMediaShow.comments}
      />
      <ul>{commentList}</ul>
    </div>
  )
}

export default SocialMediaShow