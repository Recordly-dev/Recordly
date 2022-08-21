import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
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
  content: Object,
  // folder: {

  // },
  tags: [{ type: ObjectId, ref: "Tag" }],
});

export default mongoose.model("Workspace", workspaceSchema);
