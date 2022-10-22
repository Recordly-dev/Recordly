import express from "express";

import folderApi from "#controllers/folderApi.js";
import midAuth from "#middlewares/auth.js";
import midError from "#middlewares/error.js";

const router = express.Router();

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

export default router;
