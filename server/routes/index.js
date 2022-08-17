import express from "express";

import workspaceRouter from "./workspace.js";

const router = express.Router();

router.use("/workspace", workspaceRouter);

export default router;
