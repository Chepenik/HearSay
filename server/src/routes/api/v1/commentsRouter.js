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

export default commentsRouter