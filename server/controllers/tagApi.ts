import { NextFunction, Request, Response } from "express";
import * as mongodb from "mongodb";

import modTag from "../models/tag";
import modWorkspace from "../models/workspace";
import serTag from "../services/tagService";
import TagServiceError from "../utils/error/service/TagServiceError";
import AuthenticationError from "../utils/error/AuthenticationError";

const getTagsOfCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new AuthenticationError();
  }
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
  if (!req.user) {
    throw new AuthenticationError();
  }
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
  if (!req.user) {
    throw new AuthenticationError();
  }
  const tagId = new mongodb.ObjectId(req.params.tagId);
  const { workspaceId } = req.body;
  const { _id: userId } = req.user;

  try {
    await serTag.removeTag(tagId, workspaceId, userId);
    res.json({ deleted: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const patchTag = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AuthenticationError();
  }

  const prevTagId = new mongodb.ObjectId(req.params.tagId);
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
  if (!findTag) {
    throw new TagServiceError("해당하는 태그를 찾을 수 없습니다.");
  }

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
