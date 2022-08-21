import express from "express";

import authMid from "#middlewares/auth.js";
import midError from "#middlewares/error.js";
import tagApi from "#controllers/tagApi.js";

const router = express.Router();

router
  .route("/")
  .get(
    midError.asyncWrapper(authMid.checkLogin),
    midError.asyncWrapper(tagApi.getTagsOfCurrentUser)
  );

router
  .route("/")
  .post(
    midError.asyncWrapper(authMid.checkLogin),
    midError.asyncWrapper(tagApi.createTag)
  );

export default router;
