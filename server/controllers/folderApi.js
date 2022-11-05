import modFolder from "#models/folder.js";
import modWorkspace from "#models/workspace.js";

import serWorkspace from "../services/workspaceService.js";

const getFolders = async (req, res, next) => {
  try {
    const folders = await modFolder
      .find({ writer: req.user.id })
      .sort({ title: 1 });

    res.json(folders);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createFolder = async (req, res, next) => {
  try {
    const { title } = req.body;
    const { id: writerId } = req.user;
    const folder = await modFolder.create({
      title: title,
      writer: writerId,
    });

    res.status(201).json({ data: folder });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const patchFolder = async (req, res, next) => {
  try {
    const { folderId, title: newTitle } = req.body;

    await modFolder.updateOne(
      { _id: folderId },
      {
        $set: { title: newTitle },
      }
    );

    res.json({ message: "update folder completed" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteFolder = async (req, res, next) => {
  try {
    const folderId = req.params.folderId;
    await modFolder.deleteOne({ _id: folderId });
    await serWorkspace.deleteWorkspacesInFolder(folderId);

    res.json({ data: "folder delete completed" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getWorkspacesInFolder = async (req, res, next) => {
  try {
    const folderId = req.params.folderId;

    console.log(folderId);

    const workspaces = await modWorkspace
      .find({ folder: folderId })
      .sort({ editedAt: -1 });

    res.json(workspaces);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default {
  getFolders,
  createFolder,
  patchFolder,
  deleteFolder,
  getWorkspacesInFolder,
};
