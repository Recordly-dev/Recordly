import * as moment from "moment-timezone";
import * as mongodb from "mongodb";
import { ObjectId } from "bson";

import modTag from "../models/tag";
import modWorkspace from "../models/workspace";
import TagServiceError from "../utils/error/service/TagServiceError";
import { ITag } from "../types/models/tag";

const getTagById = async (tagId: ObjectId | string): Promise<ITag | null> => {
  const findedTag = await modTag.findOne({ _id: tagId }).lean().exec();
  if (!findedTag) return null;
  return findedTag;
};

// userId, tagName을 이용해 해당하는 태그를 조회한다
const getSingleTag = (tagName: string, writerId: ObjectId) => {
  return modTag.findOne({ name: tagName, writer: writerId });
};

// 사용자가 기존에 등록했던 태그를 워크스페이스에 추가한다
const addExistingTag = async (tagId: ObjectId, workspaceId: ObjectId) => {
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
const addNewTag = async (
  tagName: string,
  writerId: ObjectId,
  workspaceId: ObjectId
) => {
  const newTag = await modTag.create({
    name: tagName,
    createdAt: moment().add(9, "hour").format("YYYY-MM-DD HH:mm:ss"),
    writer: writerId,
    workspaces: [workspaceId],
  });

  await modWorkspace.updateOne(
    { _id: workspaceId },
    { $push: { tags: newTag._id } }
  );
  return newTag;
};

const addTag = async (
  tagName: string,
  writerId: ObjectId,
  workspaceId: ObjectId
) => {
  const findTag = await getSingleTag(tagName, writerId);
  if (!findTag) {
    const newTag = await addNewTag(tagName, writerId, workspaceId);
    return newTag;
  }

  const isTagAlreadyIncluded = findTag?.workspaces.some(
    (workspace) => workspace === workspaceId
  );
  if (isTagAlreadyIncluded) {
    throw new TagServiceError("추가하려는 태그가 이미 존재합니다.");
  }

  await addExistingTag(findTag._id, workspaceId);
  return findTag;
};

const deleteWorkspaceInTag = async (tagId: ObjectId, workspaceId: ObjectId) => {
  await modTag.updateOne(
    { _id: tagId },
    { $pull: { workspaces: new mongodb.ObjectId(workspaceId) } }
  );
  const findTag = await modTag.findOne({ _id: tagId });
  if (findTag?.workspaces?.length === 0) {
    await modTag.deleteOne({ _id: tagId });
  }
  return { deleted: true };
};

const deleteTagInWorkspace = async (tagId: ObjectId, workspaceId: ObjectId) => {
  await modWorkspace.updateOne(
    { _id: workspaceId },
    { $pull: { tags: { _id: new mongodb.ObjectId(tagId) } } }
  );
  return { deleted: true };
};

// 워크스페이스에서 해당 id의 태그를 삭제합니다.
const removeTag = async (
  tagId: ObjectId,
  workspaceId: ObjectId,
  userId: ObjectId
) => {
  await deleteWorkspaceInTag(tagId, workspaceId);
  await deleteTagInWorkspace(tagId, workspaceId);
  return true;
};

const patchTag = async (
  prevTagId: ObjectId,
  tagName: string,
  writerId: ObjectId,
  workspaceId: ObjectId
) => {
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
