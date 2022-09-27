import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
    axios
      .get("api/workspace")
      .then((res) => {
        dispatch(setWorkspace(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default workspaceSlice.reducer;
