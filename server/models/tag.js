import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  writer: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  workspaces: [{ type: ObjectId, ref: "Workspace" }],
});

export default mongoose.model("Tag", tagSchema);
