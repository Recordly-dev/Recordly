import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * 최근 폴더 id값 정의
 */
export const patchCurrentFolderId = createAsyncThunk(
  "folder/patchCurrentFolderId",
  async (arg: { uid: String }) => {
    try {
      return arg.uid;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  currentFolderId: window.location.pathname.split("/").at(-1),
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: {
    [patchCurrentFolderId.fulfilled.type]: (state, action) => {
      state.currentFolderId = action.payload;
    },
  },
});

export const actions = {
  patchCurrentFolderId,
  ...folderSlice.actions,
};

export default folderSlice.reducer;
