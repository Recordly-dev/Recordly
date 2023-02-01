import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as _useDispatch } from "react-redux";

import workspace from "./slice/workspaceSlice";
import tag from "./slice/tagSlice";
import folder from "./slice/folderSlice";

const store = configureStore({
  reducer: {
    workspace,
    tag,
    folder,
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
