import modTag from "#models/tag.js";

import serTag from "../services/tagService.js";
import serWorkspace from "../services/workspaceService.js";

const getTagsOfCurrentUser = async (req, res, next) => {
  try {
    const { id: writerId } = req.user;
    const tags = await modTag
      .find({ writer: writerId })
      .populate("workspaces", "title");

    res.send(tags);
  } catch (err) {
    console.dir(err);
    next(err);
  }
};

const createTag = async (req, res, next) => {
  const { name: tagName, workspaceId } = req.body;
  const { id: writerId } = req.user;
  try {
    const findTag = await serTag.getSingleTag(tagName, writerId);
    if (findTag) {
      throw new Error("tag already exists");
    }
    const retTag = await serTag.addTag(tagName, writerId, workspaceId);
    return res.status(201).json({ data: retTag });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteTag = async (req, res, next) => {
  const tagId = req.params.tagId;
  const { workspaceId } = req.body;

  try {
    await serTag.removeTag(tagId, workspaceId);
    res.json({ deleted: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const patchTag = async (req, res, next) => {
  const tagId = req.params.tagId;
  const { id: writerId } = req.user;
  const { workspaceId, tagName } = req.body;

  try {
    await serTag.removeTag(tagId, workspaceId);
  } catch (err) {
    next(err);
  }

  try {
    const retTag = await serTag.addTag(tagName, writerId, workspaceId);
    res.json(retTag);
  } catch (err) {
    next(err);
  }
};

const getWokrspacesWithTag = async (req, res, next) => {
  const tagId = req.params.tagId;

  const findTag = await serTag.getTagById(tagId);
  const workspaces = await Promise.all(
    findTag.workspaces.map((workspaceId) =>
      serWorkspace.getWorkspaceById(workspaceId)
    )
  );
  console.log(workspaces);

  res.send(workspaces);
};

export default {
  getTagsOfCurrentUser,
  createTag,
  patchTag,
  deleteTag,
  getWokrspacesWithTag,
};
