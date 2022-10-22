import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWorkspace } from "../../types/workspace";
import axios from "axios";
import sortBy from "lodash/sortBy";

const initialState = {
  workspaceList: [],
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaceList: (state, action: PayloadAction<any>) => {
      state.workspaceList = action.payload;
    },
  },
});

export const { setWorkspaceList } = workspaceSlice.actions;

/**
 * 폴더에 있는 것 빼고 전체 workspace 불러오는 로직
 */
export const fetchWorkspace = () => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("/api/workspace")
        .then((res) => {
          const filterData = res.data.filter(
            (workspace: IWorkspace) => workspace.folder === null
          );
          dispatch(setWorkspaceList(filterData));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * 전체 workspace 불러오는 로직
 */
export const fetchAllWorkspace = () => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("api/workspace")
        .then((res) => {
          dispatch(setWorkspaceList(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * 특정 폴더의 workspace 불러오는 로직
 */
export const fetchWorkspaceInFolder = (id: string) => {
  return async (dispatch: Function) => {
    try {
      console.log("11");
      axios
        .get(`/api/folder/${id}/workspace`)
        .then((res) => {
          dispatch(setWorkspaceList(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * 검색 시 실행되는 서버 통신 로직
 */
export const filterWorkspaceList = (value: string) => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("api/workspace")
        .then((res) => {
          const filterData = res.data.filter((v: IWorkspace) => {
            if (value.length === 0) {
              return v.folder === null;
            } else {
              return v.title.includes(value);
            }
          });
          dispatch(setWorkspaceList(filterData));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * 드롭다운(최신, 오래된 순)일 때 실행되는 로직
 */
export const sortWorkspaceList = (type: string) => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("api/workspace")
        .then((res) => {
          if (type === "newest") {
            dispatch(setWorkspaceList(res.data));
          } else if (type === "oldest") {
            const sortedData = sortBy(res.data, "editedAt");
            dispatch(setWorkspaceList(sortedData));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * 즐겨찾기된 workspace 필터링 로직
 */
export const fetchFavoritesWorkspace = () => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("api/workspace")
        .then((res) => {
          const filterFavoritesWorkspace = res.data.filter(
            (v: IWorkspace) => v.favorites
          );
          dispatch(setWorkspaceList(filterFavoritesWorkspace));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export default workspaceSlice.reducer;
