import { Router } from "express";

import * as folderApi from "../controllers/folderApi";
import midAuth from "../middlewares/auth";
import midError from "../middlewares/error";

const router = Router();

router
  .route("/")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(folderApi.getFolders)
  );

router
  .route("/")
  .post(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(folderApi.createFolder)
  );

router
  .route("/:folderId")
  .patch(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(folderApi.patchFolder)
  );

router
  .route("/:folderId")
  .delete(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(folderApi.deleteFolder)
  );

router
  .route("/:folderId/workspace")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(folderApi.getWorkspacesInFolder)
  );

export default router;
