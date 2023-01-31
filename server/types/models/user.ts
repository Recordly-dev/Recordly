import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  profileImage?: string;
  oauthId: string;
  email: string;
}
