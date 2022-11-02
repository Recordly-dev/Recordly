import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IWorkspace } from "../../types/workspace";
import axios from "axios";
import { IWorkspaceState } from "../../types/workspace";

import Swal from "sweetalert2";
import sortBy from "lodash/sortBy";

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
    // 메모 수정 실패
    Swal.fire({
      position: "center",
      icon: "error",
      title: "메모 생성에 실패했습니다.",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

/**
 * 폴더에 있는 것 빼고 전체 workspace 불러오는 로직
 */
export const fetchWorkspaceList = createAsyncThunk(
  "workspace/fetchWorkspaceList",
  async () => {
    const response = await axios.get("/api/workspace");

    const filterData = response?.data.filter(
      (workspace: IWorkspace) => workspace.folder === null
    );

    return filterData;
  }
);

/**
 * 전체 workspace 불러오는 로직
 */
export const fetchAllWorkspaceList = createAsyncThunk(
  "workspace/fetchAllWorkspaceList",
  async () => {
    const response = await axios.get("/api/workspace");

    return response?.data;
  }
);

/**
 * 특정 폴더의 workspace 불러오는 로직
 */
export const fetchWorkspaceInFolder = createAsyncThunk(
  "workspace/fetchWorkspaceInFolder",
  async (arg: { uid: string }) => {
    const response = await axios.get(`/api/folder/${arg.uid}/workspace`);

    return response?.data;
  }
);

/**
 * 즐겨찾기 workspace 불러오는 로직
 */
export const fetchFavoritesWorkspaceList = createAsyncThunk(
  "workspace/fetchFavoritesWorkspaceList",
  async () => {
    const response = await axios.get("/api/workspace/favorites");

    return response?.data;
  }
);

export const patchFavoritesWorkspaceList = createAsyncThunk(
  "workspace/patchFavoritesWorkspaceList",
  async (
    arg: {
      uid: string;
      isFavorites: boolean;
      isFavoritesPage?: boolean;
    },
    { dispatch }
  ) => {
    try {
      const params = {
        workspaceId: arg.uid,
        isFavorites: arg.isFavorites,
      };
      await axios.patch(`/api/workspace/favorites/${arg.uid}`, params);

      if (arg.isFavoritesPage) {
        dispatch(fetchFavoritesWorkspaceList());
      }
    } catch (err) {
      console.log(err);
    }
  }
);

/**
 * 워크스페이스 생성
 */
export const postWorkspace = createAsyncThunk(
  "workspace/postFolderList",
  async (arg: { title: string; workspaceType: string }, { dispatch }) => {
    try {
      await axios.post("/api/workspace", {
        title: arg.title,
        workspaceType: arg.workspaceType,
      });

      dispatch(fetchWorkspaceList());
    } catch (err) {
      handleError(err);
    }
  }
);

/**
 * 워크스페이스 수정
 */
export const patchWorkspace = createAsyncThunk(
  "workspace/patchWorkspace",
  async (
    arg: {
      workspaceId: string;
      title?: string;
      folderId?: string | null;
      folder?: string;
      isFavoritesPage?: boolean;
      isTagPage?: boolean;
    },
    { dispatch }
  ) => {
    try {
      await axios.patch(`/api/workspace/${arg.workspaceId}`, {
        workspaceId: arg.workspaceId,
        folder: arg.folder,
        title: arg.title,
      });

      if (arg.isFavoritesPage) {
        dispatch(fetchFavoritesWorkspaceList());
      } else if (arg.isTagPage) {
        dispatch(fetchAllWorkspaceList());
      } else if (arg.folderId) {
        dispatch(fetchWorkspaceInFolder({ uid: arg.folderId }));
      } else {
        dispatch(fetchWorkspaceList());
      }
    } catch (err) {
      handleError(err);
    }
  }
);

/**
 * 워크스페이스 삭제
 */
export const deleteWorkspace = createAsyncThunk(
  "workspace/patchWorkspace",
  async (
    arg: {
      workspaceId: string;
      folderId: string | null;
      isFavoritesPage?: boolean;
      isTagPage?: boolean;
    },
    { dispatch }
  ) => {
    try {
      await axios.delete(`/api/workspace/${arg.workspaceId}`);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "메모가 삭제 되었습니다.",

        showConfirmButton: false,
        timer: 1000,
      });

      if (arg.isFavoritesPage) {
        dispatch(fetchFavoritesWorkspaceList());
      } else if (arg.isTagPage) {
        dispatch(fetchAllWorkspaceList());
      } else if (arg.folderId) {
        dispatch(fetchWorkspaceInFolder({ uid: arg.folderId }));
      } else {
        dispatch(fetchWorkspaceList());
      }
    } catch (err) {
      handleError(err);
    }
  }
);

/**
 * 검색에 포함된 workspace 불러오는 로직
 */
export const filterWorkspaceList = createAsyncThunk(
  "workspace/filterWorkspaceList",
  async (arg: {
    value: string;
    isFavoritesPage: boolean;
    isTagPage: boolean;
  }) => {
    if (arg.isFavoritesPage) {
      const response = await axios.get("/api/workspace/favorites");

      return response.data.filter((v: IWorkspace) => {
        if (arg.value.length === 0) {
          return v;
        } else {
          return v.title.includes(arg.value);
        }
      });
    } else if (arg.isTagPage) {
      const response = await axios.get("/api/workspace");

      return response.data.filter((v: IWorkspace) => {
        if (arg.value.length === 0) {
          return v;
        } else {
          return v.title.includes(arg.value);
        }
      });
    } else {
      const response = await axios.get("/api/workspace");

      return response.data.filter((v: IWorkspace) => {
        if (arg.value.length === 0) {
          return v.folder === null;
        } else {
          return v.title.includes(arg.value);
        }
      });
    }
  }
);

/**
 * 드롭다운(최신, 오래된 순)일 때 실행되는 로직
 */
export const sortWorkspaceList = createAsyncThunk(
  "workspace/sortWorkspaceList",
  async (arg: { type: String }, { getState }) => {
    const rootState: any = getState();
    const currentWorkspaceList = rootState.workspace.workspaceList;

    // 시간 순으로 재정렬
    const sortedData = sortBy(currentWorkspaceList, "editedAt").reverse();

    if (arg.type === "newest") {
      return sortedData;
    } else {
      const sortedReverseData = sortBy(currentWorkspaceList, "editedAt");

      return sortedReverseData;
    }
  }
);

const initialState: IWorkspaceState = {
  workspaceList: [],
  isLoading: false,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaceList: (state, action: PayloadAction<any>) => {
      state.workspaceList = action.payload;
    },
  },
  extraReducers: {
    [fetchWorkspaceList.pending.type]: (state: IWorkspaceState) => {
      state.isLoading = true;
    },
    [fetchWorkspaceList.fulfilled.type]: (state: IWorkspaceState, action) => {
      state.workspaceList = action.payload;
      state.isLoading = false;
    },
    [fetchAllWorkspaceList.pending.type]: (state: IWorkspaceState) => {
      state.isLoading = true;
    },
    [fetchAllWorkspaceList.fulfilled.type]: (
      state: IWorkspaceState,
      action
    ) => {
      state.workspaceList = action.payload;
      state.isLoading = false;
    },
    [fetchWorkspaceInFolder.pending.type]: (state: IWorkspaceState) => {
      state.isLoading = true;
    },
    [fetchWorkspaceInFolder.fulfilled.type]: (
      state: IWorkspaceState,
      action
    ) => {
      state.workspaceList = action.payload;
      state.isLoading = false;
    },
    [fetchFavoritesWorkspaceList.pending.type]: (state: IWorkspaceState) => {
      state.isLoading = true;
    },
    [fetchFavoritesWorkspaceList.fulfilled.type]: (
      state: IWorkspaceState,
      action
    ) => {
      state.workspaceList = action.payload;
      state.isLoading = false;
    },
    [filterWorkspaceList.pending.type]: (state: IWorkspaceState) => {
      state.isLoading = true;
    },
    [filterWorkspaceList.fulfilled.type]: (state: IWorkspaceState, action) => {
      state.workspaceList = action.payload;
      state.isLoading = false;
    },
    [sortWorkspaceList.pending.type]: (state: IWorkspaceState) => {
      state.isLoading = true;
    },
    [sortWorkspaceList.fulfilled.type]: (state: IWorkspaceState, action) => {
      state.workspaceList = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setWorkspaceList } = workspaceSlice.actions;

export const actions = {
  fetchWorkspaceList,
  fetchAllWorkspaceList,
  fetchWorkspaceInFolder,
  fetchFavoritesWorkspaceList,
  filterWorkspaceList,
  patchFavoritesWorkspaceList,
  sortWorkspaceList,
  postWorkspace,
  patchWorkspace,
  deleteWorkspace,
};

export default workspaceSlice.reducer;
