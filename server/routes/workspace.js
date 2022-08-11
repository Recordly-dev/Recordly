import express from "express";

import modWorkspace from "#models/workspace.js";

const router = express.Router();

router.route("/").post(async (req, res, next) => {
  try {
    const { title, workspaceType } = req.body;
    const { id: writerId } = req.user;
    const workspace = await modWorkspace.create({
      title,
      workspaceType,
      createdAt: Date.now(),
      editedAt: Date.now(),
      writer: writerId,
    });
    res.status(201);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
