import express from "express"
import { Comment } from "../../../models/index.js"
import CommentSerializer from "../../../serializers/CommentSerializer.js"

const commentsRouter = new express.Router()

commentsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const comment = await Comment.query().findById(id)
        console.log(comment)
        const website = await comment.$relatedQuery("website")
        const serializedComment = await CommentSerializer.showCommentDetails(comment)
        return res.status(200).json({ website: website, comment: serializedComment })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

commentsRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const commentData = req.body.comment;
        const comment = await Comment.query().findById(id);
        const updatedComment = await Comment.query().patch(commentData).findById(id);
        return res.status(200).json({ comment: updatedComment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: error });
    }
});

export default commentsRouter