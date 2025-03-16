import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTask, getTasks, removeTask, toggleTask } from "../store/tasksSlice";
import { AppDispatch, RootState } from "../store/store";

import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/localstorage";
import { fetchTasks } from "../api";

export const useTasks = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, loading, error, isAllLoaded } = useSelector(
    (state: RootState) => state.tasks
  );

  const fetchTaksk = async () => {
    dispatch(getTasks(5));
  };

  const handleLoadMoreTasks = () => {
    if (isAllLoaded) {
      return;
    }
    dispatch(getTasks(tasks.length + 10));
  };

  const handleAddTask = (title: string) => {
    dispatch(addTask(title));
  };

  const remove = (id: number) => {
    dispatch(removeTask(id));
  };

  const toggle = (id: number) => {
    dispatch(toggleTask(id));
  };

  return {
    tasks,
    isAllLoaded,
    loading,
    error,
    fetchTaksk,
    loadMore: handleLoadMoreTasks,
    addTask: handleAddTask,
    remove,
    toggle,
  };
};
