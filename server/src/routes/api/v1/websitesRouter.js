import express from "express";
import { Website } from "../../../models/index.js";
import websitesCommentsRouter from "./websitesCommentsRouter.js";
import WebsiteSerializer from "../../../serializers/WebsiteSerializer.js";

const websitesRouter = new express.Router();

websitesRouter.use("/:id/comments", websitesCommentsRouter);

websitesRouter.get("/", async (req, res) => {
    try {
        const websites = await Website.query();
        const serializedWebsites = websites.map(website => WebsiteSerializer.showDetails(website))
        return res.status(200).json({ websites: serializedWebsites });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
})

websitesRouter.get("/:id", async (req, res) =>{
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

export default websitesRouter;
