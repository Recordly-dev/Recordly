import express from "express";

import authRouter from "./auth.js";
import workspaceRouter from "./workspace.js";
import tagRouter from "./tag.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/workspace", workspaceRouter);
router.use("/tag", tagRouter);

export default router;
