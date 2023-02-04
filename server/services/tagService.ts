import * as moment from "moment-timezone";
import * as mongodb from "mongodb";
import { ObjectId } from "bson";

import modTag from "../models/tag";
import modWorkspace from "../models/workspace";
import TagServiceError from "../errors/service/TagServiceError";
import { ITag } from "../types/models/tag";
import { HttpCode } from "../constants/httpCode";
import { validateObjectId } from "./commonService";
import InvalidParameterError from "../errors/InvalidParameterError";

export const validateTagId = (tagId: string) => {
  try {
    validateObjectId(tagId);
  } catch (e) {
    throw new InvalidParameterError("tagId");
  }
};

export const validateOwnerOfTag = (data: ITag, writerId: ObjectId): void => {
  if (!data.writer.equals(writerId)) {
    throw new TagServiceError({
      httpCode: HttpCode.FORBIDDEN,
      description: `해당 태그의 작성자가 아닙니다.`,
    });
  }
};

export const getTagById = async (tagId: ObjectId): Promise<ITag> => {
  const findedTag = await modTag.findOne({ _id: tagId }).lean().exec();
  if (!findedTag) {
    throw new TagServiceError({
      httpCode: HttpCode.NOT_FOUND,
      description: "태그가 존재하지 않습니다.",
    });
  }
  return findedTag;
};

// userId, tagName을 이용해 해당하는 태그를 조회한다
export const getTagByNameAndWriter = async (
  tagName: string,
  writerId: ObjectId
): Promise<ITag> => {
  const findedTag = (await modTag
    .findOne({ name: tagName, writer: writerId })
    .lean()) as ITag;
  return findedTag;
};

// 사용자가 기존에 등록했던 태그를 워크스페이스에 추가한다
const addExistingTag = async (
  tagId: ObjectId,
  workspaceId: ObjectId
): Promise<void> => {
  await modTag
    .updateOne({ _id: tagId }, { $push: { workspaces: workspaceId } })
    .lean();
  await modWorkspace
    .updateOne({ _id: workspaceId }, { $push: { tags: tagId } })
    .lean();
};

// 사용자가 처음 만드는 태그를 워크스페이스에 추가한다
const addNewTag = async (
  tagName: string,
  writerId: ObjectId,
  workspaceId: ObjectId
): Promise<ITag> => {
  const newTag = await modTag.create({
    name: tagName,
    createdAt: moment().add(9, "hour").format("YYYY-MM-DD HH:mm:ss"),
    writer: writerId,
    workspaces: [workspaceId],
  });

  await modWorkspace
    .updateOne({ _id: workspaceId }, { $push: { tags: newTag._id } })
    .lean();
  return newTag;
};

export const addTag = async (
  tagName: string,
  writerId: ObjectId,
  workspaceId: ObjectId
): Promise<ITag> => {
  const findedTag = await getTagByNameAndWriter(tagName, writerId);
  if (!findedTag) {
    const newTag = await addNewTag(tagName, writerId, workspaceId);
    return newTag;
  }

  const isTagAlreadyIncluded = findedTag.workspaces.some((workspace) =>
    workspace.equals(workspaceId)
  );
  if (isTagAlreadyIncluded) {
    throw new TagServiceError({
      httpCode: HttpCode.CONFLICT,
      description: "추가하려는 태그가 이미 존재합니다.",
    });
  }

  await addExistingTag(findedTag._id, workspaceId);

  return findedTag;
};

export const deleteWorkspaceInTag = async (
  tagId: ObjectId,
  workspaceId: ObjectId
): Promise<void> => {
  await modTag
    .updateOne(
      { _id: tagId },
      { $pull: { workspaces: new mongodb.ObjectId(workspaceId) } }
    )
    .lean();

  const findedTag = await modTag.findOne({ _id: tagId });
  if (findedTag?.workspaces.length === 0) {
    await modTag.deleteOne({ _id: tagId });
  }
};

const deleteTagInWorkspace = async (
  tagId: ObjectId,
  workspaceId: ObjectId
): Promise<void> => {
  await modWorkspace
    .updateOne(
      { _id: workspaceId },
      { $pull: { tags: { _id: new mongodb.ObjectId(tagId) } } }
    )
    .lean();
};

// 워크스페이스에서 해당 id의 태그를 삭제합니다.
export const removeTag = async (
  tagId: ObjectId,
  workspaceId: ObjectId
): Promise<void> => {
  await Promise.all([
    deleteWorkspaceInTag(tagId, workspaceId),
    deleteTagInWorkspace(tagId, workspaceId),
  ]);
};

export const replaceTag = async (
  prevTagId: ObjectId,
  newTag: ITag,
  workspaceId: ObjectId
): Promise<ITag> => {
  await Promise.all([
    deleteWorkspaceInTag(prevTagId, workspaceId),
    modWorkspace
      .updateOne(
        { _id: workspaceId, "tags._id": prevTagId },
        { "tags.$": newTag }
      )
      .lean(),
  ]);

  return newTag;
};
