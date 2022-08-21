import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const workspaceTagSchema = new mongoose.Schema({
  workspaceId: { type: ObjectId, ref: "Workspace", required: true },
  tagId: { type: ObjectId, ref: "Tag", required: true },
});

export default mongoose.model("WorkspaceTag", workspaceTagSchema);
