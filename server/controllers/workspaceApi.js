import moment from "moment-timezone";

import modWorkspace from "#models/workspace.js";
import captureThumbnail from "../middlewares/captureThumbnail.js";

const getWorkspacesOfCurrentUser = async (req, res, next) => {
  try {
    const workspaces = await modWorkspace.find({ writer: req.user.id });
    res.json(workspaces);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createWorkspace = async (req, res, next) => {
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
};

const getSingleWorkspace = async (req, res, next) => {
  try {
    const workspace = await modWorkspace
      .find({ _id: req.params.workspaceId })
      .populate("tags", "name");
    res.json(workspace[0]);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const patchSingleWorkspace = async (req, res, next) => {
  try {
    const workspace = await modWorkspace.update(
      { _id: req.params.workspaceId },
      {
        editedAt: moment().add(9, "hour").format("YYYY-MM-DD HH:mm:ss"),
        ...req.body,
      }
    );
    captureThumbnail(req.params.workspaceId, req.headers.cookie.substring(8));
    res.json({ message: "update completed" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteSingleWorkspace = async (req, res, next) => {
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
};

export default {
  getWorkspacesOfCurrentUser,
  createWorkspace,
  getSingleWorkspace,
  patchSingleWorkspace,
  deleteSingleWorkspace,
};
