import * as moment from "moment-timezone";
import modWorkspace from "../models/workspace";

import serWorkspace from "../services/workspaceService";

const getWorkspacesOfCurrentUser = async (req, res, next) => {
  try {
    const workspaces = await modWorkspace
      .find({ writer: req.user.id })
      .populate("tags", "name")
      .select({ content: 0 })
      .sort({ editedAt: -1 })
      .lean();
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
      favorites: false,
      folder: null,
    });

    res.status(201).json({ data: workspace });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getSingleWorkspace = async (req, res, next) => {
  try {
    const workspaceId = req.params.workspaceId;
    const workspace = await modWorkspace
      .find({ _id: workspaceId })
      .populate("tags", "name");
    res.json(workspace[0]);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getFavoritesWorkspaceList = async (req, res, next) => {
  try {
    const workspaces = await modWorkspace
      .find({ writer: req.user.id, favorites: true })
      .populate("tags", "name")
      .select({ content: 0 })
      .sort({ editedAt: -1 });

    res.json(workspaces);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const patchSingleWorkspace = async (req, res, next) => {
  try {
    await modWorkspace.updateOne(
      { _id: req.params.workspaceId },
      {
        editedAt: moment().add(9, "hour").format("YYYY-MM-DD HH:mm:ss"),
        ...req.body,
      }
    );

    res.json({ message: "update completed" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const patchFavoritesWorkspace = async (req, res, next) => {
  try {
    const { workspaceId, isFavorites } = req.body;

    await modWorkspace.updateOne(
      { _id: workspaceId },
      {
        $set: { favorites: isFavorites },
      }
    );
    res.json({ message: "update completed" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteSingleWorkspace = async (req, res, next) => {
  const workspaceId = req.params.workspaceId;
  try {
    serWorkspace.deleteWorkspaceById(workspaceId);
    res.json({ data: "delete completed" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const saveRecommendedTags = async (req, res, next) => {
  const workspaceId = req.params.workspaceId;
  const { recommendedTags } = req.body;
  try {
    await modWorkspace.updateOne(
      { _id: workspaceId },
      { $set: { recommendedTags } }
    );
    res.send(true);
  } catch (err) {
    next(err);
  }
};

export default {
  getWorkspacesOfCurrentUser,
  createWorkspace,
  getSingleWorkspace,
  patchSingleWorkspace,
  getFavoritesWorkspaceList,
  patchFavoritesWorkspace,
  deleteSingleWorkspace,
  saveRecommendedTags,
};