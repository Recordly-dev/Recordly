import WorkspaceServiceError from "../utils/error/service/WorkspaceServiceError";
import modWorkspace from "../models/workspace";
import { ObjectId } from "bson";

import serTag from "./tagService";

const deleteWorkspaceById = async (workspaceId: ObjectId) => {
  const findWorkspace = await modWorkspace.findOne({ _id: workspaceId });
  if (!findWorkspace) {
    throw new WorkspaceServiceError(
      "id에 해당하는 workspace가 존재하지 않습니다. 따라서 삭제할 수 없습니다."
    );
  }
  findWorkspace.tags.forEach(({ _id: tagId }) => {
    serTag.deleteWorkspaceInTag(tagId, workspaceId);
  });

  await modWorkspace.deleteOne({ _id: workspaceId });

  return true;
};

const deleteWorkspacesInFolder = async (folderId: ObjectId) => {
  const workspaces = await modWorkspace.find({
    folder: folderId,
  });
  workspaces.forEach(({ _id: workspaceId }) => {
    deleteWorkspaceById(workspaceId);
  });

  return { deleted: true };
};

const getWorkspaceById = async (workspaceId: ObjectId) => {
  return await modWorkspace
    .findOne({ _id: workspaceId })
    .populate("tags", "name");
};

export default {
  deleteWorkspaceById,
  deleteWorkspacesInFolder,
  getWorkspaceById,
};
