import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/Reducer";
import taskReducer from "./Task/Reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  },
});
