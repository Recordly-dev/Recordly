import { Router } from "express";

import * as workspaceApi from "../controllers/workspaceApi";
import midAuth from "../middlewares/auth";
import midError from "../middlewares/error";
import * as thumbnailApi from "../controllers/thumbnailApi";

const router = Router();

router
  .route("/")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.getWorkspacesOfCurrentUser)
  );

router
  .route("/")
  .post(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.createWorkspace)
  );

router
  .route("/:workspaceId")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.getSingleWorkspace)
  );

router
  .route("/:workspaceId")
  .patch(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.patchSingleWorkspace)
  );

router
  .route("/:workspaceId")
  .delete(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.deleteSingleWorkspace)
  );

router
  .route("/:workspaceId/thumbnail")
  .post(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(thumbnailApi.uploadThumbnail)
  );

router
  .route("/:workspaceId/recommendedTags")
  .patch(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.saveRecommendedTags)
  );

router
  .route("/favorites")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.getFavoritedWorkspaceList)
  );

router
  .route("/favorites/:workspaceId")
  .patch(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.patchFavoritesWorkspace)
  );

export default router;
