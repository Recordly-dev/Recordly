import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFolderList = createAsyncThunk("/api/folder", async () => {
  const response = await axios.get("/api/folder");

  return response?.data;
});

export const deleteFolderList = createAsyncThunk(
  "api/folder",
  async (arg: { uid: String }, { dispatch }) => {
    await axios.delete(`/api/folder/${arg.uid}`);

    dispatch(fetchFolderList());
  }
);

export const postFolderList = createAsyncThunk(
  "api/folder",
  async (arg: { title: String }, { dispatch }) => {
    await axios.post("/api/folder/", {
      title: arg.title,
    });

    dispatch(fetchFolderList());
  }
);

export const patchFolderList = createAsyncThunk(
  "api/folder",
  async (arg: { uid: String; title: String }, { dispatch }) => {
    await axios.patch(`/api/folder/${arg.uid}`, {
      folderId: arg.uid,
      title: arg.title,
    });
    dispatch(fetchFolderList());
  }
);
const initialState = {
  folderList: [],
  isFolderLoading: false,
};

const tagSlice = createSlice({
  name: "folderList",
  initialState,
  reducers: {
    setFolderList: (state, action: PayloadAction<any>) => {
      state.folderList = action.payload;
    },
  },
  extraReducers: {
    [fetchFolderList.pending.type]: (state) => {
      state.isFolderLoading = true;
    },
    [fetchFolderList.fulfilled.type]: (state, action) => {
      state.folderList = action.payload;
      state.isFolderLoading = false;
    },
    [postFolderList.pending.type]: (state) => {
      state.isFolderLoading = true;
    },
    [postFolderList.fulfilled.type]: (state) => {
      state.isFolderLoading = false;
    },
    [deleteFolderList.pending.type]: (state) => {
      state.isFolderLoading = true;
    },
    [deleteFolderList.fulfilled.type]: (state) => {
      state.isFolderLoading = false;
    },
    [patchFolderList.pending.type]: (state) => {
      state.isFolderLoading = true;
    },
    [patchFolderList.fulfilled.type]: (state) => {
      state.isFolderLoading = false;
    },
  },
});

export const { setFolderList } = tagSlice.actions;

export const actions = {
  fetchFolderList,
  postFolderList,
  deleteFolderList,
  patchFolderList,
  setFolderList,
};

export default tagSlice.reducer;
