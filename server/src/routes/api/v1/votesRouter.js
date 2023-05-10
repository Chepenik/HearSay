import express from "express";
import { Comment, Vote } from "../../../models/index.js";

const votesRouter = new express.Router({ mergeParams: true });

votesRouter.post("/", async (req, res) => {
  const commentId = req.body.commentId;
  const voteValue = req.body.value;
  const user = req.user;

  try {
    return res.status(200).json({ message: "succcess! replace me with a new vote count" });
  } catch (error) {
    return res.status(500).json({ error: "Unable to vote on comment" });
  }});

  votesRouter.delete("/:id", async (req, res) => {
    const commentId = req.body.commentId;
    const voteValue = req.body.value;
    const user = req.user;

    try {
      return res.status(200).json({ message: "succcess! replace me with a new vote count" });
    } catch (error) {
      return res.status(500).json({ error: "Unable to delete vote on comment" });
    }
  })

export default votesRouter;