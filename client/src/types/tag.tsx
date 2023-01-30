import { IWorkspace } from "./workspace";

export interface ITagState {
  tagList: ITag[];
  isLoading: boolean;
  recommendedTagList: IRecommendedTag[];
}

export interface IRecommendedTag {
  name: string;
}

export interface ITag {
  _id: string;
  name: string;
  workspaces: IWorkspace[];
}
