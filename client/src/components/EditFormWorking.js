import React, { useEffect, useState } from "react";
import Slider from "react-slider";
import { Redirect } from "react-router-dom";

const EditFormWorking = (props) => {
    const [commentState, setCommentState] = useState({
        rating: 0,
        comment: "",
    });
    
    const [errors, setErrors] = useState({});
    const [redirect, setRedirect] = useState(false);

    const getComment = async () => {
        const commentId = props.match.params.id;
        console.log(props);
        try {
        const response = await fetch(`/api/v1/comments/${commentId}`);
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
        }
        const body = await response.json();
        const { rating, comment } = body.comment;
        setCommentState({ rating, comment });
        } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
        }
    };

    useEffect(() => {
        getComment();
    }, []);

    const handleCommentEdit = async (event) => {
        // event.preventDefault();
        const commentId = props.match.params.id;
        const updatedCommentData = { ...commentState };
        updatedCommentData.rating = parseFloat(updatedCommentData.rating);

        try {
        const response = await fetch(`/api/v1/comments/${commentId}`,
            {
            method: "PATCH",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({ comment: updatedCommentData }),
            }
        );
        // const body = await response.json();
        if (response.ok) {
            setRedirect(true);
        } else {
            console.error("Failed to update comment:", response.statusText);
        }
        } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
        }
    };

    const sliderProps = {
        min: 1,
        max: 5,
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

    const handleSubmit = event => {
        event.preventDefault()
        handleCommentEdit()
    }

    return (
        <div>
        {redirect && <Redirect to={`/websites/${props.match.params.id}`} />}
        <form className="form-container" onSubmit={handleSubmit}>
            <h5 className="form-title">Edit Your Comment</h5>
            <Slider
            {...sliderProps}
            value={commentState.rating}
            onChange={(value) =>
                setCommentState({ ...commentState, rating: value })
            }
            />

            <input
            type="text"
            name="comment"
            value={commentState.comment}
            onChange={(event) =>
                setCommentState({
                ...commentState,
                comment: event.target.value,
                })
            }
            />
            <div className="form-errors">{errors.comment}</div>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default EditFormWorking;
