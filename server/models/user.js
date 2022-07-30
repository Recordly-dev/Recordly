import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  profileImage: String,
  oauthId: String,
  email: String,
});

export default mongoose.model("User", userSchema);
