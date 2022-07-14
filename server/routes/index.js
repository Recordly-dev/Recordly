import express from "express";

import userRouter from "./user/index.js";

const router = express.Router();

router.use("/user", userRouter);

export default router;
