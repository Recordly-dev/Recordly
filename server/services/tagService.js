import modTag from "#models/tag.js";
import modWorkspace from "#models/workspace.js";
import moment from "moment-timezone";
import { ObjectId } from "mongodb";

// userId, tagName을 이용해 해당하는 태그를 조회합니다.
const getSingleTag = async (tagName, writerId) => {
  return await modTag.findOne({ name: tagName, writer: writerId }).exec();
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
  if (findTag) {
    addExistingTag(find);
    return findTag;
  }
  const newTag = addNewTag(tagName, writerId, workspaceId);
  return newTag;
};

const deleteWorkspaceInTag = async (tagId, workspaceId) => {
  await modTag.updateOne(
    { _id: tagId },
    { $pull: { workspaces: ObjectId(workspaceId) } }
  );
  const findTag = await modTag.findOne({ _id: tagId });
  if (findTag.workspaces.length === 0) {
    await modTag.deleteOne({ _id: tagId });
  }
  return { deleted: true };
};

const deleteTagInWorkspace = async (tagId, workspaceId) => {
  await modWorkspace.updateOne(
    { _id: workspaceId },
    { $pull: { tags: { _id: ObjectId(tagId) } } }
  );
  return { deleted: true };
};

// 워크스페이스에서 해당 id의 태그를 삭제합니다.
const removeTag = async (tagId, workspaceId) => {
  await deleteWorkspaceInTag(tagId, workspaceId);
  await deleteTagInWorkspace(tagId, workspaceId);
  return true;
};

export default { getSingleTag, addTag, deleteWorkspaceInTag, removeTag };
