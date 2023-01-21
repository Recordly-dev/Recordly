import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  writer: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
});

export default mongoose.model("Folder", folderSchema);
