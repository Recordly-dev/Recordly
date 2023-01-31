import { TDDocument } from "@tldraw/tldraw";

import { ITag } from "./tag";

export interface IWorkspaceState {
  workspaceList: Array<IWorkspace>;
  isLoading: boolean;
}
export interface IWorkspace {
  _id: string;
  title: string;
  workspcaeType: string;
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
