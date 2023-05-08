import React, { useState } from "react";
import Slider from "react-slider";

const CommentForm = ({ handleCommentSubmit, comments }) => {
  const [newComment, setNewComment] = useState({
    rating: 3,
    comment: "",
  });
  const [errors, setErrors] = useState({});

  const handleCommentChange = (event) => {
    setNewComment({
      ...newComment,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.comment.trim() !== "") {
      handleCommentSubmit(event, newComment);
      setNewComment({ rating: 3, comment: "" });
      setErrors({});
    } else {
      setErrors({ comment: "Error: Comment cannot be empty." });
    }
  };

  const handleSliderChange = (value) => {
    setNewComment({ ...newComment, rating: value });
  };

  const sliderProps = {
    min: 1,
    max: 5,
    value: newComment.rating,
    onChange: handleSliderChange,
    className: "customSlider",
    trackClassName: "customSlider-track",
    thumbClassName: "customSlider-thumb",
    renderThumb: (props, state) => (
      <span {...props}>
        {state.valueNow}
        🌶️
      </span>
    ),
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Slide To Choose Your Pepper Rating!
        <Slider {...sliderProps} />
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