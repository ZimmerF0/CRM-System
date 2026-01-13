import type { FilterType } from "../types/todo";

const URL = "https://easydev.club/api/v1/todos";

const headers = {
  "Content-Type": "application/json",
};

interface NewTodo {
  title: string;
  isDone: boolean;
}


const tasksAPI = {
  add: (newTodo: NewTodo) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(newTodo),
    }).then(response => response.json());
  },

  delete: (id: number) => {
    return fetch(`${URL}/${id}`, { method: "DELETE" });
  },

  change: (id: number, newText: string) => {
    return fetch(`${URL}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ title: newText }),
    });
  },

  toggle: (id: number, isDone: boolean) => {
    return fetch(`${URL}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ isDone }),
    });
  },

  getFiltered: (status: FilterType) => {
    return fetch(`${URL}?filter=${status}`).then(response => response.json());
  },
};

export default tasksAPI;
