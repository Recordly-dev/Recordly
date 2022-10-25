import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * 모든 폴더 가져오는 로직
 */
export const fetchFolderList = createAsyncThunk(
  "folderList/fetchFolderList",
  async () => {
    const response = await axios.get("/api/folder");
    return response?.data;
  }
);

/**
 * 특정 폴더 삭제하는 로직
 */
export const deleteFolderList = createAsyncThunk(
  "folderList/deleteFolderList",
  async (arg: { uid: String }, { dispatch }) => {
    await axios.delete(`/api/folder/${arg.uid}`);

    dispatch(fetchFolderList());
  }
);

/**
 * 폴더 생성하는 로직
 */
export const postFolderList = createAsyncThunk(
  "folderList/postFolderList",
  async (arg: { title: String }, { dispatch }) => {
    await axios.post("/api/folder", {
      title: arg.title,
    });

    dispatch(fetchFolderList());
  }
);

/**
 * 폴더 이름 수정하는 로직
 */
export const patchFolderList = createAsyncThunk(
  "folderList/patchFolderList",
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
  isLoading: false,
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
      state.isLoading = true;
    },
    [fetchFolderList.fulfilled.type]: (state, action) => {
      state.folderList = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setFolderList } = tagSlice.actions;

export const actions = {
  fetchFolderList,
  postFolderList,
  deleteFolderList,
  patchFolderList,
};

export default tagSlice.reducer;
