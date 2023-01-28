import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITagState } from "types/tag";

import _ from "lodash";

export const getRecommendedTagList = createAsyncThunk(
  "tag/getRecommendedTagList",
  async (arg: { text: string; workspaceId: string }, { dispatch }) => {
    try {
      axios
        .post("/kobert/tags", JSON.stringify({ text: arg.text }), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          const recommendedTags = res.data.tags;
          axios.patch(`/api/workspace/${arg.workspaceId}/recommendedTags`, {
            recommendedTags,
          });
          dispatch(setRecommendedTagList(res.data.tags));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
);

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
  reducers: {
    setTagList: (state, action: PayloadAction<any>) => {
      state.tagList = action.payload;
    },
    setRecommendedTagList: (state, action: PayloadAction<any>) => {
      state.recommendedTagList = action.payload;
    },
    addTag: (state: ITagState, action: PayloadAction<any>) => {
      state.tagList = [...state.tagList, action.payload];
    },
    // deleteTag: (state: ITagState, action: PayloadAction<any>) => {
    //   state.tagList = state.tagList.filter();
    // },
  },
  extraReducers: {
    [patchCurrentTagId.fulfilled.type]: (state, action) => {
      state.currentTagId = action.payload;
    },
  },
});

export const { setTagList, setRecommendedTagList } = tagSlice.actions;

export const actions = {
  getRecommendedTagList,
  patchCurrentTagId,
  ...tagSlice.actions,
};

export default tagSlice.reducer;
