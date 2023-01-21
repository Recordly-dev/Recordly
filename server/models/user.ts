import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  profileImage: String,
  oauthId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
