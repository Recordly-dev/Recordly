import { configureStore } from "@reduxjs/toolkit";
import workspaceSlice from "./slice/workspcaeSlice";

const store = configureStore({
  reducer: {
    workspace: workspaceSlice,
  },
});

export default store;
