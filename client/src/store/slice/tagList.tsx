import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import _, { debounce } from "lodash";

const initialState = {
  tagList: [],
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
});

export const { setTagList, setRecommendedTagList } = tagSlice.actions;

export const fetchTagList = () => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("/api/tag")
        .then((res) => {
          dispatch(setTagList(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterTagList = (workspaceId: string | undefined) => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("/api/tag")
        .then((res) => {
          dispatch(setTagList(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getRecommendedTagList = (text: string) => {
  return async (dispatch: Function) => {
    const debouncedGetFunc = _.debounce(() => {
      axios
        .post("/kobert/tags", JSON.stringify({ text }), {
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
  };
};

export default tagSlice.reducer;
