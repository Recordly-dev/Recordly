import { IFolder } from "../types/models/folder";

import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const folderSchema = new Schema<IFolder>({
  title: {
    type: String,
    required: true,
  },
  writer: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
});

export default model("Folder", folderSchema);
