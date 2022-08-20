import express from "express";
import moment from "moment-timezone";

import modWorkspace from "#models/workspace.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.route("/").post(async (req, res, next) => {
  try {
    const { title, workspaceType } = req.body;
    const { id: writerId } = req.user;
    const workspace = await modWorkspace.create({
      title,
      workspaceType,
      createdAt: moment().add(9, "hour").format("YYYY-MM-DD HH:mm:ss"),
      editedAt: moment().add(9, "hour").format("YYYY-MM-DD HH:mm:ss"),
      writer: writerId,
    });
    console.log(workspace);
    res.status(201).json({ data: workspace });
  } catch (err) {
    console.error(err);
    console.dir(err);
    next(err);
  }
});

router.route("/").get(async (req, res, next) => {
  try {
    const workspaces = await modWorkspace.find({ writer: req.user.id });
    res.json(workspaces);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.route("/:workspaceId").delete(async (req, res, next) => {
  try {
    const workspaceId = req.params.workspaceId;
    modWorkspace.deleteOne({ _id: workspaceId }).then((data) => {
      console.log(data);
    });

    res.json({ data: "delete completed" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
