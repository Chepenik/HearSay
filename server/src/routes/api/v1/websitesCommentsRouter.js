import express from "express"
import { Website, Comment } from "../../../models/index.js"
import { ValidationError } from "objection"

const websitesCommentsRouter = new express.Router({ mergeParams: true })

websitesCommentsRouter.post("/", async (req, res) => {
  const websiteId = req.params.id
  const { rating, comment } = req.body.comment

  try {
    const userId = req.user.id
    const newComment = await Comment.query().insert({ rating, comment, userId, websiteId })
    return res.status(201).json({ comment: newComment })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: "Unable to add comment" })
  }
})

websitesCommentsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    await Comment.query().deleteById(id)
    return res.status(200).json({message: "Comment was deleted"})
  } catch (error) {
    return res.status(500).json({ errors: error})
  }
})

// updating existing comment
websitesCommentsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params
  console.log("HEY ITS THE BACKEND")
  console.log(req.body)

  try {
    const content = req.body.comment
    const comment = await Comment.query().findById(id)
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }
    await Comment.query().findById(id).patch({ content })
    const updatedComment = await Comment.query().findById(id)
    return res.status(200).json({ comment: updatedComment })
  } catch (error) {
    console.error(error)
    console.log(req.body)
    return res.status(500).json({ errors: error })
  }
})

export default websitesCommentsRouter
