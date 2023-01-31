import { ObjectId } from "bson";
import { HttpCode } from "../constants/httpCode";
import FolderServiceError from "../errors/service/FolderServiceError";
import { IFolder } from "types/models/folder";

import modFolder from "../models/folder";
import * as serWorkspace from "../services/workspaceService";
import { validateObjectId } from "./commonService";
import InvalidParameterError from "../errors/InvalidParameterError";

export const validateFolderId = (folderId: string) => {
  try {
    validateObjectId(folderId);
  } catch (e) {
    throw new InvalidParameterError("folderId");
  }
};

export const validateOwnerOfFolder = (
  data: IFolder,
  writerId: ObjectId
): void => {
  if (!data.writer.equals(writerId)) {
    throw new FolderServiceError({
      httpCode: HttpCode.FORBIDDEN,
      description: `해당 폴더의 작성자가 아닙니다.`,
    });
  }
};

export const getFoldersByWriterId = async (
  writerId: ObjectId
): Promise<IFolder[]> => {
  return (await modFolder
    .find({ writer: writerId })
    .sort({ title: 1 })
    .lean()) as IFolder[];
};

export const createFolder = async (
  title: string,
  writerId: ObjectId
): Promise<IFolder> => {
  const existsSameNameFolder = (await modFolder
    .exists({ title, writer: writerId })
    .lean()) as boolean;
  if (existsSameNameFolder) {
    throw new FolderServiceError({
      httpCode: HttpCode.CONFLICT,
      description: "이미 존재하는 폴더 이름입니다.",
    });
  }

  return await modFolder.create({
    title,
    writer: writerId,
  });
};

export const getFolderById = async (folderId: ObjectId): Promise<IFolder> => {
  return (await modFolder.findOne({ _id: folderId }).lean()) as IFolder;
};

type FolderPatchDatas = {
  title?: string;
};

export const updateFolder = async (
  folderId: ObjectId,
  patchDatas: FolderPatchDatas
): Promise<IFolder> => {
  return (await modFolder
    .updateOne({ _id: folderId }, patchDatas)
    .lean()) as IFolder;
};

export const deleteFolderById = async (folderId: ObjectId): Promise<void> => {
  const existsFolder = (await modFolder
    .exists({ _id: folderId })
    .lean()) as boolean;
  if (!existsFolder) {
    throw new FolderServiceError({
      httpCode: HttpCode.CONFLICT,
      description: "삭제하려는 폴더가 존재하지 않습니다.",
    });
  }

  await Promise.all([
    modFolder.deleteOne({ _id: folderId }),
    serWorkspace.deleteWorkspacesInFolder(folderId),
  ]);
};
