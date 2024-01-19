import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Key } from "react";

interface Task {
  taskId: Key | null | undefined;
  title: string;
  description: string;
  dueDate: string;
  category: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const localToken = localStorage.getItem("token");
  const response = await axios.get("http://localhost:5000/tasks/", {
    headers: {
      Authorization: `Bearer ${localToken}`,
    },
  });
  console.log(response.data);
  return response.data;
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: Task) => {
    const localToken = localStorage.getItem("token");
    const response = await axios.post("http://localhost:5000/tasks/", task, {
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    });
    return response.data;
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      });
  },
});

export default tasksSlice.reducer;
