import React, { useEffect, useState } from "react";
import Slider from "react-slider";
import { Redirect } from "react-router-dom";

const EditForm = (props) => {
    const [commentState, setCommentState] = useState({
        rating: "",
        comment: "",
    })
    const [errors, setErrors] = useState({})
    const [redirect, setRedirect] = useState(false)

    const getComment = async () => {
        const commentId = props.match.params.id 
        console.log(props)
        try {
            const response = await fetch(`/api/v1/comments/${commentId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            console.log(body)
            setCommentState(body.comment)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getComment()
    }, [])

// const [selectedComment, setEditedComment] = useState({
//     rating: socialMediaShow.rating,
//     comment: socialMediaShow.comment,
// });
// const [errors, setErrors] = useState({});

// const handleCommentChange = (event) => {
//     setEditedComment({
//     ...selectedComment,
//     [event.currentTarget.name]: event.currentTarget.value,
//     });
// };

// const handleSubmit = (event) => {
//     event.preventDefault();
//     if (selectedComment.comment.trim() !== "") {
//     handleCommentSubmit(event, selectedComment);
//     setNewComment({ rating: 3, comment: "" });
//     setErrors({});
//     } else {
//     setErrors({ comment: "Error: Comment cannot be empty." });
//     }
// };

// const handleSliderChange = (value) => {
//     setNewComment({ ...selectedComment, rating: value });
// };

const sliderProps = {
    min: 1,
    max: 5,
    // value: selectedComment.rating,
    // onChange: handleSliderChange,
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
<form className="form-container">
        <h5 className="form-title">Edit Your Comment</h5>
    <label>
        Edit Your Pepper Rating!
    <Slider {...sliderProps} />
    </label>
        <div className="form-group">
        <label>
        Comment:
            <input
                type="text"
                name="comment"
                // value={newComment.comment}
                // onChange={handleCommentChange}
            />
        </label>
        </div>
    </form>
)


}


export default EditForm;