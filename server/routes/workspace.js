import express from "express";

import workspaceApi from "#controllers/workspaceApi.js";
import authMid from "#middlewares/auth.js";
import midError from "#middlewares/error.js";

const router = express.Router();

router
  .route("/")
  .get(
    midError.asyncWrapper(authMid.checkLogin),
    midError.asyncWrapper(workspaceApi.getWorkspacesOfCurrentUser)
  );

router
  .route("/")
  .post(
    midError.asyncWrapper(authMid.checkLogin),
    midError.asyncWrapper(workspaceApi.createWorkspace)
  );

router
  .route("/:workspaceId")
  .get(
    midError.asyncWrapper(authMid.checkLogin),
    midError.asyncWrapper(workspaceApi.getSingleWorkspace)
  );

router
  .route("/:workspaceId")
  .patch(
    midError.asyncWrapper(authMid.checkLogin),
    midError.asyncWrapper(workspaceApi.patchSingleWorkspace)
  );

router
  .route("/:workspaceId")
  .delete(
    midError.asyncWrapper(authMid.checkLogin),
    midError.asyncWrapper(workspaceApi.deleteSingleWorkspace)
  );

export default router;
