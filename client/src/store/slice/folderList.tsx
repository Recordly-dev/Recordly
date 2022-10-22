import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  folderList: [],
};

const tagSlice = createSlice({
  name: "folderList",
  initialState,
  reducers: {
    setFolderList: (state, action: PayloadAction<any>) => {
      state.folderList = action.payload;
    },
  },
});

export const { setFolderList } = tagSlice.actions;

export const fetchFolderList = () => {
  return async (dispatch: Function) => {
    try {
      axios
        .get("/api/folder")
        .then((res) => {
          dispatch(setFolderList(res?.data));
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
