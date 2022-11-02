import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Agent } from "https";
import _, { debounce } from "lodash";
import { ITagState } from "types/tag";

export const fetchTagList = createAsyncThunk(
  "tagList/fetchTagList",
  async () => {
    const response = await axios.get("/api/tag");
    return response?.data?.data;
  }
);

export const fetchWorkspaceTagList = createAsyncThunk(
  "tagList/fetchWorkspaceTagList",
  async (arg: { uid: string }) => {
    const params = {
      workspaceId: arg.uid,
    };
    const workspaceTagList = await axios.get(`/api/tagg/${arg.uid}`, { params });

    return workspaceTagList?.data?.data;
  }
);

export const postTagList = createAsyncThunk(
  "tagList/postTagList",
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

// export const deleteTagList = createAsyncThunk(
//   "tagList/deleteTagList",
//   async (arg: { workspaceId: string }, { dispatch }) => {
//     await axios.delete(`/api/tag/${arg.workspaceId}`);

//   }
// );

// export const getAllTagList = createAsyncThunk(
//   "tagList/getAllTagList",
//   async () => {
//     const response =
//   }
// )

export const getRecommendedTagList = createAsyncThunk(
  "tagList/getRecommendedTagList",
  async (arg: { text: string }, { dispatch }) => {
    const debouncedGetFunc = _.debounce(async () => {
      axios
        .post("/kobert/tags", JSON.stringify({ text: arg.text }), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          dispatch(setRecommendedTagList(res.data.tags));
        })
        .catch((err) => {
          console.log(err);
        });
    }, 10000);

    try {
      debouncedGetFunc();
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
  name: "tagList",
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
  },
  extraReducers: {
    [fetchTagList.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchTagList.fulfilled.type]: (state, action) => {
      state.tagList = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setTagList, setRecommendedTagList } = tagSlice.actions;

export const actions = {
  fetchTagList,
  postTagList,
  getRecommendedTagList,
  ...tagSlice.actions,
};

export default tagSlice.reducer;
