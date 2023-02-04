import { Request, Response } from "express";
import * as mongodb from "mongodb";

import modTag from "../models/tag";
import * as serTag from "../services/tagService";
import * as serWorkspace from "../services/workspaceService";
import AuthenticationError from "../errors/AuthenticationError";
import { HttpCode } from "../constants/httpCode";

export const getTagsOfCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  const { _id: writerId } = req.user;

  const tags = await modTag
    .find({ writer: writerId })
    .populate("workspaces", "title");

  res.status(HttpCode.OK).json({
    message: "태그가 정상적으로 조회되었습니다.",
    result: {
      tags,
    },
  });
};

export const createTag = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  const { _id: writerId } = req.user;
  const { name: tagName, workspaceId } = req.body;

  const createdTag = await serTag.addTag(tagName, writerId, workspaceId);

  res.status(HttpCode.CREATED).json({
    message: "태그가 정상적으로 추가되었습니다.",
    result: {
      tag: createdTag,
    },
  });
};

export const deleteTag = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  serTag.validateTagId(req.params.tagId);

  const tagId = new mongodb.ObjectId(req.params.tagId);
  const { workspaceId } = req.body;
  const { _id: userId } = req.user;

  const findedTag = await serTag.getTagById(tagId);
  serTag.validateOwnerOfTag(findedTag, userId);

  await serTag.removeTag(tagId, workspaceId);

  res.status(HttpCode.OK).json({
    message: "태그가 정상적으로 삭제되었습니다.",
    response: {
      deletedTagId: tagId,
      workspaceId: workspaceId,
    },
  });
};

export const patchTag = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  serTag.validateTagId(req.params.tagId);

  const { _id: userId } = req.user;
  const prevTagId = new mongodb.ObjectId(req.params.tagId);
  const { workspaceId, tagName } = req.body;

  const prevTag = await serTag.getTagById(prevTagId);
  serTag.validateOwnerOfTag(prevTag, userId);

  const newTag = await serTag.addTag(tagName, userId, workspaceId);
  await serTag.replaceTag(prevTagId, newTag, workspaceId);

  res.status(HttpCode.OK).json({
    message: "태그가 정상적으로 수정되었습니다.",
    response: {
      newTag,
      workspaceId: workspaceId,
    },
  });
};

export const getWokrspacesWithTag = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  serTag.validateTagId(req.params.tagId);

  const { _id: userId } = req.user;
  const tagId = new mongodb.ObjectId(req.params.tagId);

  const findedTag = await serTag.getTagById(tagId);
  serTag.validateOwnerOfTag(findedTag, userId);

  const populatedWorkspaces = await serWorkspace.getWorkspacesPopulatedWithTags(
    findedTag.workspaces
  );

  res.status(HttpCode.OK).json({
    message:
      "해당 태그를 등록한 워크스페이스 리스트를 정상적으로 조회했습니다.",
    result: {
      workspaces: populatedWorkspaces,
    },
  });
};
