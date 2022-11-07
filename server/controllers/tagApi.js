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
    const retTag = await serTag.addTag(tagName, writerId, workspaceId);
    res.json(retTag);
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
  const prevTagId = req.params.tagId;
  const { id: writerId } = req.user;
  const { workspaceId, tagName } = req.body;

  try {
    const changedTag = await serTag.patchTag(
      prevTagId,
      tagName,
      writerId,
      workspaceId
    );
    res.json(changedTag);
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

  res.send(workspaces);
};

export default {
  getTagsOfCurrentUser,
  createTag,
  patchTag,
  deleteTag,
  getWokrspacesWithTag,
};
