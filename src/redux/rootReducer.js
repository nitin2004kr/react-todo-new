import { combineReducers } from "@reduxjs/toolkit";
import  tasks  from "./slices/todayTask/todayTaskSlice";
const rootReducer = combineReducers({
    todayTask: tasks
})

export default rootReducer;