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

export default websitesRouter;
