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
    return await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(newTodo),
    }).then(response => response.json());
  } catch (error) {
    alert("failed to add task");
    throw error;
  }
}

export async function deleteTask(id: number): Promise<Response> {
  try {
    return await fetch(`${URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    alert("error while deleting task");
    throw error;
  }
}

export async function updateTask(
  id: number,
  data: TodoRequest
): Promise<Response> {
  try {
    return await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
  } catch (error) {
    alert("error while updating task");
    throw error;
  }
}

export async function getFilteredTask(
  status: FilterType
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    return await fetch(`${URL}?filter=${status}`).then(response =>
      response.json()
    );
  } catch (error) {
    alert("error while filtered task");
    throw error;
  }
}
