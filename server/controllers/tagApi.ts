import { NextFunction, Request, Response } from "express";

import modTag from "../models/tag";
import modWorkspace from "../models/workspace";
import serTag from "../services/tagService";

const getTagsOfCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: writerId } = req.user;
    const tags = await modTag
      .find({ writer: writerId })
      .populate("workspaces", "title");

    res.send(tags);
  } catch (err) {
    console.dir(err);
    next(err);
  }
};

const createTag = async (req: Request, res: Response, next: NextFunction) => {
  const { name: tagName, workspaceId } = req.body;
  const { _id: writerId } = req.user;
  try {
    const retTag = await serTag.addTag(tagName, writerId, workspaceId);
    res.json(retTag);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = req.params.tagId;
  const { workspaceId } = req.body;

  try {
    await serTag.removeTag(tagId, workspaceId);
    res.json({ deleted: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const patchTag = async (req: Request, res: Response, next: NextFunction) => {
  const prevTagId = req.params.tagId;
  const { _id: writerId } = req.user;
  const { workspaceId, tagName } = req.body;

  try {
    const changedTag = await serTag.patchTag(
      prevTagId,
      tagName,
      writerId,
      workspaceId
    );
    res.json(changedTag);
  } catch (err) {
    next(err);
  }
};

const getWokrspacesWithTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tagId = req.params.tagId;

  const findTag = await serTag.getTagById(tagId);
  const workspaces = await Promise.all(
    findTag.workspaces.map((workspaceId) =>
      modWorkspace
        .findOne({ _id: workspaceId })
        .select({ content: 0 })
        .populate("tags", { name: 1 })
        .lean()
    )
  );

  res.send(workspaces);
};

export default {
  getTagsOfCurrentUser,
  createTag,
  patchTag,
  deleteTag,
  getWokrspacesWithTag,
};
