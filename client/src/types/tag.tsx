export interface ITagState {
  tagList: Array<any>;
  isLoading: boolean;
  recommendedTagList: Array<any>;
}

export interface ITag {
  _id: string;
  name: string;
}
