import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { ITag } from "../types/models/tag";

const tagSchema = new Schema<ITag>({
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

tagSchema.index({ name: 1, writer: 1 }, { unique: true });

export default model("Tag", tagSchema);
