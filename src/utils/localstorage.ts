import { Task } from "../store/tasksSlice";

const STORAGE_TASKS = "tasks";

export const saveTasksToLocalStorage = (tasks: Task[]) => {
  console.log(tasks);
  localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasks));
};

export const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks = localStorage.getItem(STORAGE_TASKS);
  return savedTasks ? JSON.parse(savedTasks) : [];
};
