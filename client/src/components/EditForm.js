import React, { useEffect, useState } from "react";
import Slider from "react-slider";
import { Redirect } from "react-router-dom";

const EditForm = (props) => {
    const [commentState, setCommentState] = useState({
        rating: 1,
        comment: "",
    });
    const [websiteId, setWebsiteId] = useState(null)
    
    const [errors, setErrors] = useState({});
    const [redirect, setRedirect] = useState(false);

    const getComment = async () => {
        const commentId = props.match.params.id;
        try {
            const response = await fetch(`/api/v1/comments/${commentId}`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const body = await response.json();
            const { rating, comment, userId } = body.comment;
            setCommentState({ rating, comment, userId });
            setWebsiteId(body.website.id)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    useEffect(() => {
        getComment();
    }, []);

    const handleCommentEdit = async (event) => {
        event.preventDefault();
        const commentId = props.match.params.id;
        const updatedCommentData = { ...commentState };
        updatedCommentData.rating = parseFloat(updatedCommentData.rating);
        try {
            const response = await fetch(
                `/api/v1/comments/${commentId}`,
                {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ comment: updatedCommentData }),
                }
        );
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

    if (redirect) {
        return <Redirect to={`/websites/${websiteId}`} />
    }

    return (
        <>
            <form className="form-container" onSubmit={handleCommentEdit}>
                <h5 className="form-title">Edit Your Comment</h5>
                <Slider
                    {...sliderProps}
                    value={commentState.rating}
                    onChange={(value) => {
                            setCommentState({ ...commentState, rating: value })
                        }
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
        </>
    );
};

export default EditForm;