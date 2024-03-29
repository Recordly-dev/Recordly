import { TDDocument } from "@tldraw/tldraw";

import { ITag } from "./tag";

export interface IWorkspaceState {
  isSearchStatus: boolean;
}
export interface IWorkspace {
  _id: string;
  title: string;
  workspaceType: string;
  tags: ITag[];
  createdAt: string;
  editedAt: string;
  writer: string;
  folder: string;
  favorites: boolean;
  content: TDDocument;
}

export interface IWorkspaceMap {
  [key: string]: IWorkspace;
}
