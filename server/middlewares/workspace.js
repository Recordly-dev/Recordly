import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  profileImage: String,
  oauthId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

userSchema.plugin(findOrCreate);

export default mongoose.model("User", userSchema);
