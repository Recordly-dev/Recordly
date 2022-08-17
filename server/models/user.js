import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  profileImage: String,
  oauthId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

userSchema.plugin(findOrCreate);

export default mongoose.model("User", userSchema);
