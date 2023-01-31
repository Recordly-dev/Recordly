import { Schema, model } from "mongoose";

import { IUser } from "../types/models/user";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  profileImage: String,
  oauthId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const userModel = model("User", userSchema);

export default userModel;
