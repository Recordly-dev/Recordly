import { TDDocument } from "@tldraw/tldraw";

export interface IWorkspace {
  _id: string;
  title: string;
  workspcaeType: string;
  tags: string[];
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
