import { Router } from "express";

import authRouter from "./auth";
import workspaceRouter from "./workspace";
import tagRouter from "./tag";
import folderRouter from "./folder";
import profileRouter from "./profile";

const router = Router();

router.use("/auth", authRouter);
router.use("/workspace", workspaceRouter);
router.use("/tag", tagRouter);
router.use("/folder", folderRouter);
router.use("/profile", profileRouter);

export default router;
