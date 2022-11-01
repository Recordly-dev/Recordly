import moment from "moment-timezone";

import modTag from "#models/tag.js";
import modWorkspace from "#models/workspace.js";

const getTagsOfCurrentUser = async (req, res, next) => {
  try {
    const { id: writerId } = req.user;
    const tags = await modTag
      .find({ writer: writerId })
      .populate("workspaces", "title");

    res.json({ data: tags });
  } catch (err) {
    console.error(err);
    console.dir(err);
    next(err);
  }
};

const getTagsOfCurrentWorkspace = async (req, res, next) => {
  try {
    const { id: writerId } = req.user;
    const { workspaceId } = req.query;

    const tags = await modTag
      .find({ writer: writerId, workspaces: { $in: workspaceId } })
      .populate("workspaces", "title");

    res.json({ data: tags });
  } catch (err) {
    console.error(err);
    console.dir(err);
    next(err);
  }
};

const createTag = async (req, res, next) => {
  try {
    const { name, workspaceId } = req.body;
    const { id: writerId } = req.user;

    const findTag = await modTag
      .findOne({ name, writer: writerId, workspaces: { $in: workspaceId } })
      .exec();

    if (findTag) {
      findTag.workspaces.push(workspaceId);
      await modWorkspace.update(
        { _id: workspaceId },
        { $push: { tags: findTag._id } }
      );
      return res.status(201).json({ data: findTag });
    } else {
      const newTag = await modTag.create({
        name,
        createdAt: moment().add(9, "hour").format("YYYY-MM-DD HH:mm:ss"),
        writer: writerId,
        workspaces: [workspaceId],
      });
      await modWorkspace.update(
        { _id: workspaceId },
        { $push: { tags: newTag._id } }
      );
      return res.status(201).json({ data: newTag });
    }
  } catch (err) {
    console.error(err);
    console.dir(err);
    next(err);
  }
};

export default { getTagsOfCurrentUser, getTagsOfCurrentWorkspace, createTag };
