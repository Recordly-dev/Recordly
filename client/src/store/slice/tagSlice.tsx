import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITagState } from "types/tag";

import _ from "lodash";

/**
 * 최근 태그 id값 정의
 */
export const patchCurrentTagId = createAsyncThunk(
  "folder/patchCurrentFolderId",
  async (arg: { tagId: String }) => {
    try {
      return arg.tagId;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  tagList: [],
  isLoading: false,
  recommendedTagList: [],
  currentTagId: "",
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: {
    [patchCurrentTagId.fulfilled.type]: (state, action) => {
      state.currentTagId = action.payload;
    },
  },
});

export const actions = {
  patchCurrentTagId,
  ...tagSlice.actions,
};

export default tagSlice.reducer;
