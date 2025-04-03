import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  taskData: [],
  error: false,
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
