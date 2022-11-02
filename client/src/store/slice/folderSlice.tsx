import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const handleError = (err: any) => {
  if (err.response.data.error === 11000) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "중복된 이름이 있습니다.",
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "메모 폴더에 실패했습니다.",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};
/**
 * 모든 폴더 가져오는 로직
 */
export const fetchFolderList = createAsyncThunk(
  "folder/fetchFolderList",
  async () => {
    const response = await axios.get("/api/folder");
    return response?.data;
  }
);

/**
 * 특정 폴더 삭제하는 로직
 */
export const deleteFolderList = createAsyncThunk(
  "folder/deleteFolderList",
  async (arg: { uid: String }, { dispatch }) => {
    await axios.delete(`/api/folder/${arg.uid}`);

    dispatch(fetchFolderList());
  }
);

/**
 * 폴더 생성하는 로직
 */
export const postFolderList = createAsyncThunk(
  "folder/postFolderList",
  async (arg: { title: String }, { dispatch }) => {
    try {
      await axios.post("/api/folder", {
        title: arg.title,
      });

      dispatch(fetchFolderList());
    } catch (err) {
      handleError(err);
    }
  }
);

/**
 * 폴더 이름 수정하는 로직
 */
export const patchFolderList = createAsyncThunk(
  "folder/patchFolderList",
  async (arg: { uid: String; title: String }, { dispatch }) => {
    try {
      await axios.patch(`/api/folder/${arg.uid}`, {
        folderId: arg.uid,
        title: arg.title,
      });
      dispatch(fetchFolderList());
    } catch (err) {
      handleError(err);
    }
  }
);

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
  folderList: [],
  currentFolderId: window.location.pathname.split("/").at(-1),
  isLoading: false,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFolderList: (state, action: PayloadAction<any>) => {
      state.folderList = action.payload;
    },
    setInitialFolderList: (state) => {
      state.folderList = [];
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
    [patchCurrentFolderId.fulfilled.type]: (state, action) => {
      state.currentFolderId = action.payload;
    },
  },
});

export const { setFolderList } = folderSlice.actions;

export const actions = {
  fetchFolderList,
  postFolderList,
  deleteFolderList,
  patchFolderList,
  patchCurrentFolderId,
  ...folderSlice.actions,
};

export default folderSlice.reducer;
