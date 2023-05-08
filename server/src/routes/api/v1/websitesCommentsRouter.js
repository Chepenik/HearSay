import express from "express";
import { Website, Comment } from "../../../models/index.js";

const websitesCommentsRouter = new express.Router({ mergeParams: true });

websitesCommentsRouter.post("/", async (req, res) => {
  const websiteId = req.params.id;
  const { comment } = req.body;

  try {
    const userId = req.user.id;
    const newComment = await Comment.query().insert({ comment, userId, websiteId });

    return res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error(`ERROR ${error.message}`);
    return res.status(500).json({ error: "Unable to add comment" });
  }
});

websitesCommentsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    await Comment.query().deleteById(id)
    return res.status(200).json({message: "Comment was deleted"})
  } catch (error) {
    return res.status(500).json({ errors: error})
  }
})

export default websitesCommentsRouter;
