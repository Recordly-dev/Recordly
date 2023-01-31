import { Document } from "mongoose";
import { IUser } from "./user";

export interface IFolder extends Document {
  title: string;
  writer: IUser["_id"];
}
