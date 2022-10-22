import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tagList: [],
};

const tagSlice = createSlice({
  name: "tagList",
  initialState,
  reducers: {
    setTagList: (state, action: PayloadAction<any>) => {
      state.tagList = action.payload;
    },
  },
});

export const { setTagList } = tagSlice.actions;

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

export default tagSlice.reducer;
