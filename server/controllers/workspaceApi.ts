import * as moment from "moment-timezone";
import { NextFunction, Request, Response } from "express";

import modWorkspace from "../models/workspace";
import serWorkspace from "../services/workspaceService";

const getWorkspacesOfCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaces = await modWorkspace
      .find({ writer: req.user._id })
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

const createWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, workspaceType } = req.body;
    const { _id: writerId } = req.user;

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

const getSingleWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const getFavoritesWorkspaceList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaces = await modWorkspace
      .find({ writer: req.user._id, favorites: true })
      .populate("tags", "name")
      .select({ content: 0 })
      .sort({ editedAt: -1 });

    res.json(workspaces);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const patchSingleWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const patchFavoritesWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const deleteSingleWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const workspaceId = req.params.workspaceId;
  try {
    serWorkspace.deleteWorkspaceById(workspaceId);
    res.json({ data: "delete completed" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const saveRecommendedTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
