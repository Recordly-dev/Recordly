import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

import { IWorkspace } from "../types/models/workspace";

const workspaceSchema = new Schema<IWorkspace>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  workspaceType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  editedAt: {
    type: Date,
    required: true,
  },
  writer: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  favorites: {
    type: Boolean,
    required: true,
  },

  content: Object,

  folder: {
    type: ObjectId,
    ref: "Folder",
  },
  tags: [{ type: ObjectId, ref: "Tag" }],
  recommendedTags: [{ type: String }],
});

export default model("Workspace", workspaceSchema);
