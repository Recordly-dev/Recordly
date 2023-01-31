import { Router } from "express";

import midAuth from "../middlewares/auth";
import midError from "../middlewares/error";
import * as tagApi from "../controllers/tagApi";

const router = Router();

router
  .route("/")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(tagApi.getTagsOfCurrentUser)
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

router
  .route("/:tagId")
  .delete(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(tagApi.deleteTag)
  );

router
  .route("/:tagId/workspaces")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(tagApi.getWokrspacesWithTag)
  );

export default router;
