import { Document } from "mongoose";
import { IFolder } from "./folder";

import { ITag } from "./tag";
import { IUser } from "./user";

export interface IWorkspace extends Document {
  title: string;
  workspaceType: string;
  createdAt: Date;
  editedAt: Date;
  writer: IUser["_id"];
  favorites: boolean;
  content: object;
  folder: IFolder["_id"];
  tags: ITag["_id"][];
  recommendedTags: string[];
}
