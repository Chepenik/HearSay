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
      const websiteData = req.body;
      const newWebsite = await Website.query().insert(websiteData);
      return res.status(201).json({ website: newWebsite });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
});  

export default websitesRouter;
