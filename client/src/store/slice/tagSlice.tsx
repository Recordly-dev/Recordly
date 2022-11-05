import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITagState } from "types/tag";

import _ from "lodash";
import { Agent } from "http";

export const fetchTagList = createAsyncThunk("tag/fetchTagList", async () => {
  const response = await axios.get("/api/tag");
  return response?.data;
});

export const fetchWorkspaceTagList = createAsyncThunk(
  "tag/fetchWorkspaceTagList",
  async (arg: { uid: string }) => {
    const params = {
      workspaceId: arg.uid,
    };
    const workspaceTagList = await axios.get(`/api/tag/${arg.uid}`, {
      params,
    });

    return workspaceTagList?.data;
  }
);

export const postTag = createAsyncThunk(
  "tag/postTagList",
  async (
    arg: { name: string; workspaceId: string },
    { dispatch, getState }
  ) => {
    await axios.post("/api/tag", {
      name: arg.name,
      workspaceId: arg.workspaceId,
    });

    const rootState: any = getState();
    const tagList = rootState.tag.tagList;
    dispatch(setTagList([...tagList, { name: arg.name }]));
  }
);

export const deleteTag = createAsyncThunk(
  "tag/deleteTagList",
  async (
    arg: { tagId: string; workspaceId: string },
    { dispatch, getState }
  ) => {
    try {
      await axios.delete(`/api/tag/${arg.tagId}`, {
        data: { workspaceId: arg.workspaceId },
      });

      const rootState: any = getState();
      const tagList = rootState.tag.tagList;

      dispatch(setTagList(tagList.filter((tag: any) => tag._id !== arg.tagId)));
    } catch (err) {
      console.log(err);
    }
  }
);

export const patchTag = createAsyncThunk(
  "tag/deleteTagList",
  async (
    arg: { tagId: string; tagName: string; workspaceId: string },
    { dispatch, getState }
  ) => {
    try {
      await axios.patch(`/api/tag/${arg.tagId}`, {
        workspaceId: arg.workspaceId,
        tagName: arg.tagName,
      });

      const rootState: any = getState();
      const tagList = rootState.tag.tagList;

      dispatch(
        setTagList(
          tagList.map((tag: any) => {
            if (tag._id === arg.tagId) {
              return {
                ...tag,
                name: arg.tagName,
              };
            } else {
              return tag;
            }
          })
        )
      );
    } catch (err) {
      console.log(err);
    }
  }
);

// export const getAllTagList = createAsyncThunk(
//   "tag/getAllTagList",
//   async () => {
//     const response =
//   }
// )

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

const initialState = {
  tagList: [],
  isLoading: false,
  recommendedTagList: [],
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
    [fetchTagList.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchTagList.fulfilled.type]: (state, action) => {
      state.tagList = action.payload;
      state.isLoading = false;
    },
    [fetchWorkspaceTagList.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchWorkspaceTagList.fulfilled.type]: (state, action) => {
      state.tagList = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setTagList, setRecommendedTagList } = tagSlice.actions;

export const actions = {
  fetchTagList,
  fetchWorkspaceTagList,
  postTag,
  deleteTag,
  patchTag,
  getRecommendedTagList,
  ...tagSlice.actions,
};

export default tagSlice.reducer;
