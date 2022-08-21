import express from "express";

import workspaceRouter from "./workspace.js";
import tagRouter from "./tag.js";

const router = express.Router();

router.use("/workspace", workspaceRouter);
router.use("/tag", tagRouter);

export default router;
