import { configureStore } from "@reduxjs/toolkit";
import  tasks  from "./slices/addTaskSlice";

const store = configureStore({
  reducer: {
    taskData: tasks,
  },
});

export default store;
