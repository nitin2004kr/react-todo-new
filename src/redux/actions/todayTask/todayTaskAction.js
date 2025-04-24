import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTodoService, deleteTodoService, getTodoService, updateTodoService } from "../../services/todayTask/todayTaskService";

// calling the service to update the task
export const updateTodayTaskTodo = createAsyncThunk(
  'todos/updateTodayTaskTodo',
  async (todo) => {
    const updatedTask = await updateTodoService(todo);
    return updatedTask;
  }
)

// calling the service of delete task
export const deleteTodayTaskTodo = createAsyncThunk(
    'todos/deleteTodayTaskTodo',
    async (id) => {
        const deleteTask = await deleteTodoService(id);
        return deleteTask;
    }
)

// calling the service of get all task list form database 
export const getTodayTaskTodo = createAsyncThunk(
    'todos/getTodayTaskTodo',
    async () => {
        const todayTaskList = await getTodoService();
        return todayTaskList;
    }
);

// calling the service of import data in database 
export const createTodayTaskTodo = createAsyncThunk(
  "todos/createTodayTaskTodo",
  async (todo) => {
    const newTodo = await addTodoService(todo);
    return newTodo;
  }
);
