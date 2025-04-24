import { createSlice } from "@reduxjs/toolkit";
import {
  createTodayTaskTodo,
  getTodayTaskTodo,
} from "../../actions/todayTask/todayTaskAction";

const initialState = {
  taskData: [],
  loading: true,
  error: false,
};

const taskSlice = createSlice({
  name: "todayTaskSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodayTaskTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodayTaskTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTodayTaskTodo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getTodayTaskTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodayTaskTodo.fulfilled, (state, action) => {
        state.taskData = action.payload;
        state.loading = false;
      })
      .addCase(getTodayTaskTodo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
