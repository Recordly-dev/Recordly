import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from "react-redux";

import workspaceList from "./slice/workspaceList";
import tagList from "./slice/tagList";
import folderList from "./slice/folderList";

const store = configureStore({
  reducer: {
    workspace: workspaceList,
    tag: tagList,
    folder: folderList,
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
