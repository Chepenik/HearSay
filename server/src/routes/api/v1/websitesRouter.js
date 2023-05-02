import express from "express";
import { Website } from "../../../models/index.js";

const websitesRouter = new express.Router();

websitesRouter.get("/", async (req, res) => {
    try {
        const websites = await Website.query();
        return res.status(200).json({ websites: websites });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
})

websitesRouter.post("/", async (req, res) => {
    try {
        const { name, url } = req.body;
        const socialMedia = await SocialMedia.query().insert({ name, url });
        const website = await Website.query().insertandFetch({ socialMedia: socialMedia.id });
        return res.status(201).json({ website });
    } catch (error) {
    return res.status(500).json({ errors: error });
    }
})


export default websitesRouter;
