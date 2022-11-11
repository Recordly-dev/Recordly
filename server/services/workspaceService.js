import modWorkspace from "#models/workspace.js";

const deleteWorkspacesInFolder = async (folderId) => {
  await modWorkspace.deleteMany({
    folder: folderId,
  });
  return { deleted: true };
};

const getWorkspaceById = async (workspaceId) => {
  return await modWorkspace
    .findOne({ _id: workspaceId })
    .populate("tags", "name");
};

export default { deleteWorkspacesInFolder, getWorkspaceById };
