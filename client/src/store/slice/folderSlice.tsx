import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IFolerState } from "types/folder";
/**
 * 최근 폴더 id값 정의
 */
export const updateCurrentFolderId = createAsyncThunk(
  "folder/updateCurrentFolderId",
  async (arg: { uid: String }) => {
    try {
      return arg.uid;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState: IFolerState = {
  currentFolderId: "",
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: {
    [updateCurrentFolderId.fulfilled.type]: (state, action) => {
      state.currentFolderId = action.payload;
    },
  },
});

export const actions = {
  updateCurrentFolderId,
  ...folderSlice.actions,
};

export default folderSlice.reducer;
