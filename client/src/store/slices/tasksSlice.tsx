import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Key } from "react";
import queryString from "query-string";

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

interface Filter {
  isCompleted?: boolean;
  title?: string;
  category?: string;
}

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (filter: Filter) => {
    const localToken = localStorage.getItem("token");
    const filterParams = queryString.stringify(filter);
    const response = await axios.get(
      `http://localhost:5000/tasks?${filterParams}`,
      {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      }
    );
    return response.data;
  }
);

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

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: Key, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/tasks/${taskId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (task: Task, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:5000/tasks/${task.taskId}`, {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        category: task.category,
      });
      return task;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const toggleTaskCompletion = createAsyncThunk(
  "tasks/toggleTaskCompletion",
  async (
    { taskId, isCompleted }: { taskId: string; isCompleted: boolean },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/tasks/${taskId}/completed`,
        { isCompleted }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message } as {
        error: string;
      });
    }
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
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.taskId !== action.payload._id
        );
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.taskId === updatedTask.taskId ? updatedTask : task
        );
      })
      .addCase(
        toggleTaskCompletion.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const index = state.tasks.findIndex(
            (task) => task.taskId === action.payload.taskId
          );
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        }
      );
  },
});

export default tasksSlice.reducer;
