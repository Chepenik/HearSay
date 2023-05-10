import express from "express";
import { Website } from "../../../models/index.js";
import websitesCommentsRouter from "./websitesCommentsRouter.js";
import WebsiteSerializer from "../../../serializers/WebsiteSerializer.js";
import CommentSerializer from "../../../serializers/CommentSerializer.js";

const websitesRouter = new express.Router();

websitesRouter.use("/:id/comments", websitesCommentsRouter);

websitesRouter.get("/", async (req, res) => {
    try {
        const websites = await Website.query();
        const serializedWebsites = websites.map(website => WebsiteSerializer.getDetailsForList(website))
        return res.status(200).json({ websites: serializedWebsites });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
})

websitesRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const website = await Website.query().findById(id)
        const serializedWebsite = await WebsiteSerializer.showDetails(website)
        return res.status(200).json({ website: serializedWebsite })
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

websitesRouter.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
    await Comment.query().deleteById(id)
    return res.status(200).json({message: "Comment was deleted"})
    } catch (error) {
    return res.status(500).json({ errors: error})
    }
})

websitesRouter.get("/:id/edit", async (req, res) => {
    const { id } = req.params
    try {
        const comment = await Comment.query().findById(id)
        const serializedComment = await CommentSerializer.showCommentDetails(comment)
        return res.status(200).json({ comment: serializedComment })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

websitesRouter.patch("/:id", async (req, res) => {
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

export default websitesRouter;
