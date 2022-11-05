import modWorkspace from "#models/workspace.js";

const deleteWorkspacesInFolder = async (folderId) => {
  await modWorkspace.deleteMany({
    folder: folderId,
  });
  return { deleted: true };
};

export default { deleteWorkspacesInFolder };
