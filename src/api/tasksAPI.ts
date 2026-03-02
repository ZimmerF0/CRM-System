import { axiosClient } from "./axiosClient";

import type {
  FilterType,
  Todo,
  TodoInfo,
  TodoRequest,
  MetaResponse,
} from "../types/todo";

export async function addTask(newTodo: TodoRequest): Promise<Todo> {
  const { data } = await axiosClient.post<Todo>("/todos", newTodo);
  return data;
}

export async function deleteTask(id: number): Promise<void> {
  await axiosClient.delete(`/todos/${id}`);
}

export async function updateTask(
  id: number,
  payload: TodoRequest,
): Promise<Todo> {
  const { data } = await axiosClient.put<Todo>(`/todos/${id}`, payload);
  return data;
}

export async function getFilteredTask(
  status: FilterType,
): Promise<MetaResponse<Todo, TodoInfo>> {
  const { data } = await axiosClient.get<MetaResponse<Todo, TodoInfo>>(
    "/todos",
    {
      params: { filter: status },
    },
  );
  return data;
}
