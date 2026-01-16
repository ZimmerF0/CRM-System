import type { FilterType, TodoRequest } from "../types/todo";

const URL = "https://easydev.club/api/v1/todos";

const headers = {
  "Content-Type": "application/json",
};

export function addTask(newTodo: TodoRequest) {
  return fetch(URL, {
    method: "POST",
    headers,
    body: JSON.stringify(newTodo),
  }).then(response => response.json());
}

export function deleteTask(id: number) {
  return fetch(`${URL}/${id}`, { method: "DELETE" });
}

export function updateTask(id: number, data: TodoRequest) {
  return fetch(`${URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
}

export function getFilteredTask(status: FilterType) {
  return fetch(`${URL}?filter=${status}`).then(response => response.json());
}
