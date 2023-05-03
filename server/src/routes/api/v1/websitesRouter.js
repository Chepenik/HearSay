import express from "express";
import { Website, Comment } from "../../../models/index.js";

const websitesRouter = new express.Router();

websitesRouter.get("/:id/comments", async (req, res) => {
    const { id } = req.params;
    try {
      const comments = await Comment.query().where({ websiteId: id });
      return res.status(200).json({ comments });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  });

websitesRouter.get("/", async (req, res) => {
    try {
        const websites = await Website.query();
        return res.status(200).json({ websites: websites });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
})

websitesRouter.get("/:id", async (req, res) =>{
    const { id } = req.params
    try {
        const website = await Website.query().findById(id)
        const comments = await website.$relatedQuery("comments")
        return res.status(200).json({ website: website, comments: comments })
    } catch(error) {
        return res.status(500).json({ errors: error })
    } 
})

websitesRouter.post("/", async (req, res) => {
    try {
      const websiteData = req.body;
      const newWebsite = await Website.query().insert(websiteData);
      return res.status(201).json({ website: newWebsite });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
});  

export default websitesRouter;
