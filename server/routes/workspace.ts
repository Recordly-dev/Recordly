import { Router } from "express";
import { diskStorage } from "multer";
import * as multer from "multer";

import workspaceApi from "../controllers/workspaceApi";
import midAuth from "../middlewares/auth";
import midError from "../middlewares/error";

const router = Router();

router
  .route("/favorites")
  .get(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.getFavoritesWorkspaceList)
  );

router
  .route("/favorites/:workspaceId")
  .patch(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.patchFavoritesWorkspace)
  );

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

const upload = multer({
  storage: diskStorage({
    destination(req, file, cb) {
      cb(null, "public/assets/images/thumbnail/");
    },
    filename(req, file, cb) {
      cb(null, `${req.params.workspaceId}.png`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router
  .route("/:workspaceId/thumbnail")
  .post(
    midError.asyncWrapper(midAuth.checkLogin),
    upload.single("file"),
    (req, res) => {
      res.json({ data: "thumbnail saved" });
    }
  );

router
  .route("/:workspaceId/recommendedTags")
  .patch(
    midError.asyncWrapper(midAuth.checkLogin),
    midError.asyncWrapper(workspaceApi.saveRecommendedTags)
  );

export default router;