import { ObjectId } from "bson";

import { IWorkspace } from "../types/models/workspace";
import WorkspaceServiceError from "../errors/service/WorkspaceServiceError";
import modWorkspace from "../models/workspace";
import * as serTag from "./tagService";
import { HttpCode } from "../constants/httpCode";
import { getCurrentDate } from "../utils/date";

export const validateOwnerOfWorkspace = (
  data: IWorkspace,
  writerId: ObjectId
): void => {
  if (data.writer !== writerId) {
    throw new WorkspaceServiceError({
      httpCode: HttpCode.FORBIDDEN,
      description: `해당 워크스페이스의 작성자가 아닙니다.`,
    });
  }
};

export const getWorkspacesByWriterId = async (
  writerId: ObjectId,
  selectOption: object = {}
): Promise<IWorkspace[]> => {
  return (await modWorkspace
    .find({ writer: writerId })
    .populate("tags", "name")
    .select(selectOption)
    .sort({ editedAt: -1 })
    .lean()) as IWorkspace[];
};

export const createWorkspace = async (
  title: string,
  workspaceType: string,
  writerId: ObjectId
): Promise<IWorkspace> => {
  const existsSameNameWorkspace = (await modWorkspace
    .exists({ title, writer: writerId })
    .lean()) as boolean;
  if (existsSameNameWorkspace) {
    throw new WorkspaceServiceError({
      httpCode: HttpCode.CONFLICT,
      description: "이미 존재하는 워크스페이스 이름입니다.",
    });
  }

  return await modWorkspace.create({
    title,
    workspaceType,
    createdAt: getCurrentDate(),
    editedAt: getCurrentDate(),
    writer: writerId,
    favorites: false,
    folder: null,
  });
};

export const getWorkspaceById = async (
  workspaceId: ObjectId,
  selectOption: object = {}
): Promise<IWorkspace> => {
  const findedWorkspace = (await modWorkspace
    .findOne({ _id: workspaceId })
    .populate("tags", "name")
    .select(selectOption)
    .lean()) as IWorkspace;
  if (!findedWorkspace) {
    throw new WorkspaceServiceError({
      httpCode: HttpCode.NOT_FOUND,
      description: "워크스페이스가 존재하지 않습니다.",
    });
  }
  return findedWorkspace;
};

type WorkspacePatchDatas = {
  title?: string;
  folder?: string;
  content?: object;
  recommendedTags?: string[];
  favorites?: boolean;
};

export const updateWorkspace = async (
  workspaceId: ObjectId,
  patchOptions: WorkspacePatchDatas
): Promise<IWorkspace> => {
  return (await modWorkspace
    .updateOne(
      { _id: workspaceId },
      {
        editedAt: getCurrentDate(),
        ...patchOptions,
      }
    )
    .lean()) as IWorkspace;
};

export const getFavoratedWorkspacesByWriter = async (
  writerId: ObjectId
): Promise<IWorkspace[]> => {
  return (await modWorkspace
    .find({ writer: writerId, favorites: true })
    .populate("tags", "name")
    .select({ content: 0 })
    .sort({ editedAt: -1 })
    .lean()) as IWorkspace[];
};

export const deleteWorkspaceById = async (
  workspaceId: ObjectId
): Promise<void> => {
  const findedWorkspace = (await modWorkspace
    .findOne({ _id: workspaceId })
    .lean()) as IWorkspace;
  if (!findedWorkspace) {
    throw new WorkspaceServiceError({
      httpCode: HttpCode.CONFLICT,
      description: "삭제하려는 워크스페이스가 존재하지 않습니다.",
    });
  }

  await Promise.all([
    ...findedWorkspace.tags.map(({ _id: tagId }) =>
      serTag.deleteWorkspaceInTag(tagId, workspaceId)
    ),
    modWorkspace.deleteOne({ _id: workspaceId }),
  ]);
};

export const updateRecommendedTagsOfWorkspace = () => {};

export const deleteWorkspacesInFolder = async (folderId: ObjectId) => {
  const workspaces = await modWorkspace.find({
    folder: folderId,
  });
  await Promise.all(
    workspaces.map(({ _id: workspaceId }) => deleteWorkspaceById(workspaceId))
  );
};

export const getWorkspacesPopulatedWithTags = async (
  workspaceIdList: ObjectId[]
): Promise<IWorkspace[]> =>
  Promise.all(
    workspaceIdList.map((workspaceId) =>
      modWorkspace
        .findOne({ _id: workspaceId })
        .select({ content: 0 })
        .populate("tags", { name: 1 })
        .lean()
    )
  ) as Promise<IWorkspace[]>;

export const getWorkspacesByFolderId = async (
  folderId: ObjectId
): Promise<IWorkspace[]> => {
  return (await modWorkspace
    .find({ folder: folderId })
    .populate("tags", "name")
    .select({ content: 0 })
    .sort({ editedAt: -1 })
    .lean()) as IWorkspace[];
};
