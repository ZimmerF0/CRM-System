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
  const response = await fetch(URL, {
    method: "POST",
    headers,
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error("Failed to add task");
  }

  return await response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}

export async function updateTask(
  id: number,
  data: TodoRequest
): Promise<Response> {
  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return await response.json();
}

export async function getFilteredTask(
  status: FilterType
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await fetch(`${URL}?filter=${status}`)
  if (!response.ok) {
    throw new Error("Failed to fetch filtered tasks");
  }

  return await response.json();
}
