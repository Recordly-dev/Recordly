import { Document } from "mongoose";
import { IUser } from "./user";
import { IWorkspace } from "./workspace";

export interface ITag extends Document {
  name: string;
  writer: IUser["_id"];
  workspaces: IWorkspace["_id"][];
}
