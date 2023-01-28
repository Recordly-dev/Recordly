import { Request, Response } from "express";
import * as mongodb from "mongodb";

import * as serFolder from "../services/folderService";
import * as serWorkspace from "../services/workspaceService";
import AuthenticationError from "../errors/AuthenticationError";
import { HttpCode } from "../constants/httpCode";

export const getFolders = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  const userId = new mongodb.ObjectId(req.user.id);
  const folders = await serFolder.getFoldersByWriterId(userId);

  res.status(HttpCode.OK).json({
    message: "폴더 리스트가 정상적으로 조회되었습니다.",
    result: {
      folders,
    },
  });
};

export const createFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }

  const { title } = req.body;
  const writerId = new mongodb.ObjectId(req.user.id);
  const folder = serFolder.createFolder(title, writerId);

  res.status(HttpCode.CREATED).json({
    message: "폴더가 정상적으로 생성되었습니다.",
    result: {
      folder,
    },
  });
};

export const patchFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  const userId = new mongodb.ObjectId(req.user.id);
  const folderId = new mongodb.ObjectId(req.params.folderId);
  const { title } = req.body;

  const findedFolder = await serFolder.getFolderById(folderId);
  serFolder.validateOwnerOfFolder(findedFolder, userId);

  const updatedFolder = await serFolder.updateFolder(folderId, { title });

  res.status(HttpCode.OK).json({
    message: "폴더가 정상적으로 수정되었습니다.",
    result: {
      folder: updatedFolder,
    },
  });
};

export const deleteFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }

  const folderId = new mongodb.ObjectId(req.params.folderId);
  const userId = new mongodb.ObjectId(req.user.id);

  const findedFolder = await serFolder.getFolderById(folderId);
  serFolder.validateOwnerOfFolder(findedFolder, userId);

  await serFolder.deleteFolderById(folderId);

  res.status(HttpCode.OK).json({
    message: "폴더가 정상적으로 삭제되었습니다.",
    result: {
      folderId: folderId,
    },
  });
};

export const getWorkspacesInFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError();
  }

  const folderId = new mongodb.ObjectId(req.params.folderId);
  const userId = new mongodb.ObjectId(req.user.id);

  const findedFolder = await serFolder.getFolderById(folderId);
  serFolder.validateOwnerOfFolder(findedFolder, userId);

  const workspaces = await serWorkspace.getWorkspacesByFolderId(folderId);

  res.status(HttpCode.OK).json({
    message: "폴더 안의 워크스페이스 리스트가 성공적으로 조회되었습니다.",
    result: {
      workspaces,
      folder: findedFolder.title,
    },
  });
};
