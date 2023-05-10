import express from "express"
import { Comment } from "../../../models/index.js"
import CommentSerializer from "../../../serializers/CommentSerializer.js"

const commentsRouter = new express.Router()

commentsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const comment = await Comment.query().findById(id)
        const serializedComment = await CommentSerializer.showCommentDetails(comment)
        return res.status(200).json({ comment: serializedComment })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

commentsRouter.get("/:id/edit", async (req, res) => {
    const { id } = req.params
    try {
        const comment = await Comment.query().findById(id)
        const serializedComment = await CommentSerializer.showCommentDetails(comment)
        return res.status(200).json({ comment: serializedComment })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

commentsRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
    const commentData = req.body.comment;
    if (Object.keys(commentData).length === 0) {
        return res.status(400).json({ message: "No update data provided" });
    }
    const comment = await Comment.query().findById(id);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }
    await Comment.query().findById(id).patch(commentData);
    const updatedComment = await Comment.query().findById(id);
    return res.status(200).json({ comment: updatedComment });
    } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: error });
    }
});

export default commentsRouter