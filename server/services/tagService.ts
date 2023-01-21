import modTag from "../models/tag";
import modWorkspace from "../models/workspace";
import * as moment from "moment-timezone";
import { ObjectId } from "mongodb";

const getTagById = (tagId) => modTag.findOne({ _id: tagId });

// userId, tagName을 이용해 해당하는 태그를 조회합니다.
const getSingleTag = (tagName, writerId) => {
  return modTag.findOne({ name: tagName, writer: writerId });
};

// 사용자가 기존에 등록했던 태그를 워크스페이스에 추가한다
const addExistingTag = async (tagId, workspaceId) => {
  await modTag.updateOne(
    { _id: tagId },
    { $push: { workspaces: workspaceId } }
  );
  await modWorkspace.updateOne(
    { _id: workspaceId },
    { $push: { tags: tagId } }
  );
};

// 사용자가 처음 만드는 태그를 워크스페이스에 추가한다
const addNewTag = async (tagName, writerId, workspaceId) => {
  const newTag = await modTag.create({
    name: tagName,
    createdAt: moment().add(9, "hour").format("YYYY-MM-DD HH:mm:ss"),
    writer: writerId,
    workspaces: [workspaceId],
  });

  await modWorkspace.update(
    { _id: workspaceId },
    { $push: { tags: newTag._id } }
  );
  return newTag;
};

const addTag = async (tagName, writerId, workspaceId) => {
  const findTag = await getSingleTag(tagName, writerId);
  if (findTag?.workspaces.includes(workspaceId)) {
    throw new Error("tag already exists");
  }
  if (findTag) {
    await addExistingTag(findTag._id, workspaceId);
    return findTag;
  }
  const newTag = await addNewTag(tagName, writerId, workspaceId);
  return newTag;
};

const deleteWorkspaceInTag = async (tagId, workspaceId) => {
  await modTag.updateOne(
    { _id: tagId },
    { $pull: { workspaces: new ObjectId(workspaceId) } }
  );
  const findTag = await modTag.findOne({ _id: tagId });
  if (findTag?.workspaces?.length === 0) {
    await modTag.deleteOne({ _id: tagId });
  }
  return { deleted: true };
};

const deleteTagInWorkspace = async (tagId, workspaceId) => {
  await modWorkspace.updateOne(
    { _id: workspaceId },
    { $pull: { tags: { _id: new ObjectId(tagId) } } }
  );
  return { deleted: true };
};

// 워크스페이스에서 해당 id의 태그를 삭제합니다.
const removeTag = async (tagId, workspaceId) => {
  await deleteWorkspaceInTag(tagId, workspaceId);
  await deleteTagInWorkspace(tagId, workspaceId);
  return true;
};

const patchTag = async (prevTagId, tagName, writerId, workspaceId) => {
  const addedTag = await addTag(tagName, writerId, workspaceId);

  await deleteWorkspaceInTag(prevTagId, workspaceId);
  await modWorkspace.updateOne(
    { _id: workspaceId, "tags._id": prevTagId },
    { "tags.$": addedTag }
  );

  return addedTag;
};

export default {
  getTagById,
  getSingleTag,
  addTag,
  deleteWorkspaceInTag,
  removeTag,
  patchTag,
};
