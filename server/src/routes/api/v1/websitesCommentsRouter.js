import express from "express";
import { Website, Comment } from "../../../models/index.js";

const websitesCommentsRouter = new express.Router({ mergeParams: true });

websitesCommentsRouter.post("/", async (req, res) => {
  const websiteId = req.params.id;
  const { comment } = req.body;

  try {
    const website = await Website.query().findById(websiteId);
    const userId = req.user.id;
    const newComment = await Comment.query().insert({ comment, userId, websiteId });

    return res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error(`ERROR ${error.message}`);
    return res.status(500).json({ error: "Unable to add comment" });
  }
});

export default websitesCommentsRouter;
