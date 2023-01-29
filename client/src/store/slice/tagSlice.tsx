import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITagState } from "types/tag";

import _ from "lodash";

/**
 * 최근 태그 id값 정의
 */
export const updateCurrentTagId = createAsyncThunk(
  "folder/updateCurrentFolderId",
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
    [updateCurrentTagId.fulfilled.type]: (state, action) => {
      state.currentTagId = action.payload;
    },
  },
});

export const actions = {
  updateCurrentTagId,
  ...tagSlice.actions,
};

export default tagSlice.reducer;
