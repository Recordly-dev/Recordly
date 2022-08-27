import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  workspaceList: [],
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspace: (state, action) => {
      state.workspaceList = action.payload;
    },
  },
});

export const { setWorkspace } = workspaceSlice.actions;

export const fetchWorkspace = () => {
  return async (dispatch) => {
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
