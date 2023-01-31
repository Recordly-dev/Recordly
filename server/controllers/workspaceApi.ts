import { Request, Response } from "express";
import * as mongodb from "mongodb";

import * as serWorkspace from "../services/workspaceService";
import AuthenticationError from "../errors/AuthenticationError";
import { HttpCode } from "../constants/httpCode";

export const getWorkspacesOfCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  const userId = new mongodb.ObjectId(req.user.id);

  const workspaces = await serWorkspace.getWorkspacesByWriterId(userId, {
    content: 0,
  });
  res.status(HttpCode.OK).json({
    message: "워크스페이스가 정상적으로 조회되었습니다.",
    result: {
      workspaces,
    },
  });
};

export const createWorkspace = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  const { title, workspaceType } = req.body;
  const { _id: userId } = req.user;

  const createdWorkspace = serWorkspace.createWorkspace(
    title,
    workspaceType,
    userId
  );

  res.status(HttpCode.CREATED).json({
    message: "워크스페이스가 정상적으로 생성되었습니다.",
    result: {
      workspace: createdWorkspace,
    },
  });
};

export const getSingleWorkspace = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  serWorkspace.validateWorkspaceId(req.params.workspaceId);

  const { _id: userId } = req.user;
  const workspaceId = new mongodb.ObjectId(req.params.workspaceId);

  const findedWorkspace = await serWorkspace.getWorkspaceById(workspaceId);
  serWorkspace.validateOwnerOfWorkspace(findedWorkspace, userId);

  res.status(HttpCode.OK).json({
    message: "워크스페이스가 정상적으로 조회되었습니다.",
    result: {
      workspace: findedWorkspace,
    },
  });
};

export const patchSingleWorkspace = async (
  req: Request,
  res: Response
): Promise<void> => {
  serWorkspace.validateWorkspaceId(req.params.workspaceId);

  const workspaceId = new mongodb.ObjectId(req.params.workspaceId);
  const { title, folder, content } = req.body;
  const patchOptions = {
    ...(title && { title }),
    ...(folder && { folder }),
    ...(content && { content }),
  };

  const updatedWorkspace = await serWorkspace.updateWorkspace(
    workspaceId,
    patchOptions
  );

  res.status(HttpCode.OK).json({
    message: "워크스페이스가 정상적으로 수정되었습니다.",
    result: {
      workspace: updatedWorkspace,
    },
  });
};

export const deleteSingleWorkspace = async (
  req: Request,
  res: Response
): Promise<void> => {
  serWorkspace.validateWorkspaceId(req.params.workspaceId);

  const workspaceId = new mongodb.ObjectId(req.params.workspaceId);
  await serWorkspace.deleteWorkspaceById(workspaceId);
  res.status(HttpCode.OK).json({
    message: "워크스페이스가 정상적으로 삭제되었습니다.",
    result: {
      workspaceId: workspaceId,
    },
  });
};

export const saveRecommendedTags = async (
  req: Request,
  res: Response
): Promise<void> => {
  serWorkspace.validateWorkspaceId(req.params.workspaceId);

  const workspaceId = new mongodb.ObjectId(req.params.workspaceId);
  const { recommendedTags } = req.body;

  const updatedWorkspace = await serWorkspace.updateWorkspace(workspaceId, {
    recommendedTags,
  });

  res.status(HttpCode.OK).json({
    message: "추천 태그가 정상적으로 업데이트되었습니다.",
    result: {
      workspace: updatedWorkspace,
    },
  });
};

export const getFavoritedWorkspaceList = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  const userId = new mongodb.ObjectId(req.user.id);
  const workspaces = await serWorkspace.getFavoratedWorkspacesByWriter(userId);

  res.status(HttpCode.OK).json({
    message: "즐겨찾기한 워크스페이스 리스트가 정상적으로 조회되었습니다.",
    result: {
      workspaces,
    },
  });
};

export const patchFavoritesWorkspace = async (
  req: Request,
  res: Response
): Promise<void> => {
  serWorkspace.validateWorkspaceId(req.params.workspaceId);

  const workspaceId = new mongodb.ObjectId(req.params.workspaceId);
  const { isFavorites } = req.body;

  const updatedWorkspace = await serWorkspace.updateWorkspace(workspaceId, {
    favorites: isFavorites,
  });

  res.status(HttpCode.OK).json({
    message: "워크스페이스의 즐겨찾기 여부가 정상적으로 수정되었습니다.",
    result: {
      workspace: updatedWorkspace,
    },
  });
};
