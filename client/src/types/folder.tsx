export interface IFolerState {
  folderList: Array<any>;
  currentFolderId: string;
  isLoading: boolean;
}
export interface IFolder {
  _id: string;
  title: string;
  writer: string;
}
