import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchTasks } from "../api/index";
import { customAlphabet } from "nanoid";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/localstorage";

const nanoid = customAlphabet("1234567890", 10);

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  isAllLoaded: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  isAllLoaded: false,
};

export const getTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (limit: number = 5) => {
    const localTasks = loadTasksFromLocalStorage();
    console.log(localTasks);
    const data = await fetchTasks(limit);
    if (!localTasks || !localTasks.length) {
      saveTasksToLocalStorage(data);
    }
    const localTasksMap = new Map(localTasks.map((t) => [t.id, t]));
    const allTasksMap = new Map();
    /**
     * Merge local tasks with remote tasks but give priorety to locals.
     */
    data.forEach((remoteData) => {
      if (!localTasksMap.has(remoteData.id)) {
        allTasksMap.set(remoteData.id, remoteData);
        return;
      }
      allTasksMap.set(remoteData.id, localTasksMap.get(remoteData.id));
    });
    const allTasks = Array.from(allTasksMap.values());
    saveTasksToLocalStorage(allTasks);
    return {
      tasks: allTasks,
      isAllLoaded: limit < allTasks.length,
    };
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        userId: 1,
        id: parseInt(nanoid(), 10),
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
      // const storage = loadTasksFromLocalStorage();
      // saveTasksToLocalStorage([newTask, ...storage]);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);

      const storeTasks = loadTasksFromLocalStorage();
      const updated = storeTasks.filter((task) => task.id !== action.payload);

      saveTasksToLocalStorage(updated);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
        state.isAllLoaded = action.payload.isAllLoaded;
        state.loading = false;
      })

      .addCase(getTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch tasks";
      });
  },
});

export const { addTask, toggleTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
