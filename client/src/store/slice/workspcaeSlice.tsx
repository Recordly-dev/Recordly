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
    setWorkspace: (state, action: PayloadAction<any>) => {
      state.workspaceList = action.payload;
    },
  },
});

export const { setWorkspace } = workspaceSlice.actions;

export const fetchWorkspace = () => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("api/workspace")
        .then((res) => {
          dispatch(setWorkspace(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterWorkspaceList = (value: string) => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("api/workspace")
        .then((res) => {
          const filterData = res.data.filter((v: IWorkspace) =>
            v.title.includes(value)
          );
          dispatch(setWorkspace(filterData));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const sortWorkspaceList = (type: string) => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("api/workspace")
        .then((res) => {
          if (type === "newest") {
            dispatch(setWorkspace(res.data));
          } else if (type === "oldest") {
            const sortedData = sortBy(res.data, "editedAt");
            dispatch(setWorkspace(sortedData));
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

export const fetchFavoritesWorkspace = () => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("api/workspace")
        .then((res) => {
          const filterFavoritesWorkspace = res.data.filter(
            (v: IWorkspace) => v.favorites
          );
          dispatch(setWorkspace(filterFavoritesWorkspace));
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
