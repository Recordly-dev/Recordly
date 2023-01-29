import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IWorkspaceState } from "../../types/workspace";

/**
 * 검색 중인지 아닌지 판단
 */
export const patchSearchStatus = createAsyncThunk(
  "workspace/patchSearchStatus",
  (arg: { isSearch: Boolean }) => {
    return arg.isSearch;
  }
);

const initialState: IWorkspaceState = {
  isSearchStatus: false,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {},
  extraReducers: {
    [patchSearchStatus.fulfilled.type]: (state, action) => {
      state.isSearchStatus = action.payload;
    },
  },
});

export const actions = {
  patchSearchStatus,
  ...workspaceSlice.actions,
};

export default workspaceSlice.reducer;
