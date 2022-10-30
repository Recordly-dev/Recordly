import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _, { debounce } from "lodash";

export const fetchTagList = createAsyncThunk(
  "tagList/fetchTagList",
  async () => {
    const response = await axios.get("/api/tag");
    return response?.data;
  }
);

export const getRecommendedTagList = createAsyncThunk(
  "tagList/getRecommendedTagList",
  async (arg: { text: string }) => {
    const debouncedGetFunc = _.debounce(() => {
      axios
        .post("/kobert/tags", JSON.stringify({ text: arg.text }), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log(res.data.tags);
          return res.data.tags;
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);

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
  },
  extraReducers: {
    [fetchTagList.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchTagList.fulfilled.type]: (state, action) => {
      state.tagList = action.payload;
      state.isLoading = false;
    },
    [getRecommendedTagList.fulfilled.type]: (state, action) => {
      state.recommendedTagList = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setTagList, setRecommendedTagList } = tagSlice.actions;

export const actions = {
  fetchTagList,
  getRecommendedTagList,
  ...tagSlice.actions,
};

export default tagSlice.reducer;
