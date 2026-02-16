import axios from "axios";

import type {
  FilterType,
  Todo,
  TodoInfo,
  TodoRequest,
  MetaResponse,
} from "../types/todo";

const URL = "https://easydev.club/api/v1/todos";

const headers = {
  "Content-Type": "application/json",
};

export async function addTask(newTodo: TodoRequest): Promise<Todo> {
  try {
    const { data } = await axios.post<Todo>(URL, newTodo, { headers });

    return data;
  } catch {
    throw new Error("Failed to add task");
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    await axios.delete(`${URL}/${id}`);
  } catch {
    throw new Error("Failed to delete task");
  }
}

export async function updateTask(id: number, data: TodoRequest): Promise<Todo> {
  try {
    const res = await axios.put<Todo>(`${URL}/${id}`, data, { headers });

    return res.data;
  } catch {
    throw new Error("Failed to update task");
  }
}

export async function getFilteredTask(
  status: FilterType,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const { data } = await axios.get<MetaResponse<Todo, TodoInfo>>(URL, {
      params: { filter: status },
    });
    return data;
  } catch {
    throw new Error("Failed to fetch filtered tasks");
  }
}
