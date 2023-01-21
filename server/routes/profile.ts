import { Router } from "express";

import midAuth from "../middlewares/auth";
import midError from "../middlewares/error";
import authApi from "../controllers/authApi";

const router = Router();

router
  .route("/")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(authApi.getProfile)
  );

export default router;
