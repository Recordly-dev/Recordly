import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  profileImage?: string;
  oauthId: string;
  email: string;
}
