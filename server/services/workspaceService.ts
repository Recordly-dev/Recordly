import { Types } from "mongoose";
import modWorkspace from "../models/workspace";

import serTag from "./tagService";

const deleteWorkspaceById = async (workspaceId: Types.ObjectId | string) => {
  const findWorkspace = await modWorkspace.findOne({ _id: workspaceId });
  findWorkspace.tags.forEach(({ _id: tagId }) => {
    serTag.deleteWorkspaceInTag(tagId, workspaceId);
  });

  await modWorkspace.deleteOne({ _id: workspaceId });

  return true;
};

const deleteWorkspacesInFolder = async (folderId: Types.ObjectId | string) => {
  const workspaces = await modWorkspace.find({
    folder: folderId,
  });
  workspaces.forEach(({ _id: workspaceId }) => {
    deleteWorkspaceById(workspaceId);
  });

  return { deleted: true };
};

const getWorkspaceById = async (workspaceId: Types.ObjectId | string) => {
  return await modWorkspace
    .findOne({ _id: workspaceId })
    .populate("tags", "name");
};

export default {
  deleteWorkspaceById,
  deleteWorkspacesInFolder,
  getWorkspaceById,
};
