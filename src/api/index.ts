import axios from "axios";
import { Task } from "../store/tasksSlice";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = async (limit: number = 5): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(`${API_URL}?_limit=${limit}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};
