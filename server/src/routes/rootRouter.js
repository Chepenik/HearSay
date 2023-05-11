import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import websitesRouter from "./api/v1/websitesRouter.js";
import commentsRouter from "./api/v1/commentsRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/websites", websitesRouter);
rootRouter.use("/api/v1/comments", commentsRouter)

export default rootRouter;