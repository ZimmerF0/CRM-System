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
  return fetch(URL, {
    method: "POST",
    headers,
    body: JSON.stringify(newTodo),
  }).then(response => response.json());
}

export async function deleteTask(id: number): Promise<Response> {
  return fetch(`${URL}/${id}`, { method: "DELETE" });
}

export async function updateTask(
  id: number,
  data: TodoRequest
): Promise<Response> {
  return fetch(`${URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
}

export async function getFilteredTask(
  status: FilterType
): Promise<MetaResponse<Todo, TodoInfo>> {
  return fetch(`${URL}?filter=${status}`).then(response => response.json());
}
