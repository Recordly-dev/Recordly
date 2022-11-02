import express from "express";

import midAuth from "#middlewares/auth.js";
import midError from "#middlewares/error.js";
import tagApi from "#controllers/tagApi.js";

const router = express.Router();

router
  .route("/")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(tagApi.getTagsOfCurrentUser)
  );

router
  .route("/:workspaceId")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(tagApi.getTagsOfCurrentWorkspace)
  );

router
  .route("/")
  .post(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(tagApi.createTag)
  );

router
  .route("/:tagId")
  .patch(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(tagApi.patchTag)
  );

export default router;
