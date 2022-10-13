import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from "react-redux";

import workspaceSlice from "./slice/workspcaeSlice";
import tagListSlice from "./slice/tagListSlice";

const store = configureStore({
  reducer: {
    workspace: workspaceSlice,
    tagList: tagListSlice,
  },
});

export function useDispatch() {
  const dispatch = _useDispatch();
  return (event: any) => {
    dispatch(event);
  };
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
