import express from "express";

import midAuth from "#middlewares/auth.js";
import midError from "#middlewares/error.js";
import authApi from "#controllers/authApi.js";

const router = express.Router();

router
  .route("/")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(authApi.getProfile)
  );

export default router;
