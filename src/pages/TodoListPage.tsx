import { useEffect, useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoFilter } from "../components/TodoFilter";
import { TodoList } from "../components/TodoList";

import {
  addTask,
  deleteTask,
  updateTask,
  getFilteredTask,
} from "../api/tasksAPI";

import type { Todo, TodoInfo, FilterType } from "../types/todo";

import "../styles/App.css";

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [todosInfo, setTodosInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const addTodo = async (title: string) => {
    const newTodo = { title, isDone: false };

    await addTask(newTodo);
    filterTodos(activeFilter);
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTask(id);

      setTodos(prev => prev.filter(todo => todo.id !== id));
      await filterTodos(activeFilter);
    } catch (error) {
      console.error(error);
      alert("Не удалось удалить задачу");
    }
  };

  const changeTodo = async (id: number, newText: string) => {
    try {
      await updateTask(id, { title: newText });

      setTodos(
        todos.map(todo => (todo.id === id ? { ...todo, title: newText } : todo))
      );
    } catch (error) {
      console.error(error);
      alert("Не удалось изменить задачу");
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todoToToggle = todos.find(todo => todo.id === id);
      if (!todoToToggle) return;

      await updateTask(id, { isDone: !todoToToggle.isDone });

      setTodos(todos =>
        todos.map(todo =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
      await filterTodos(activeFilter);
    } catch (error) {
      console.error(error);
      alert("Не удалось завуршить задачу");
    }
  };

  const filterTodos = async (status: FilterType) => {
    try {
      const data = await getFilteredTask(status);

      setTodos(data.data);
      if (data.info) {
        setTodosInfo(data.info);
      }
      setActiveFilter(status);
    } catch (error) {
      console.error(error);
      alert("Не удалось отфильтровать задачи");
    }
  };

  useEffect(() => {
    filterTodos("all");
  }, []);

  return (
    <div className="main">
      <h1 className="title">TodoList</h1>
      <TodoForm addTodo={addTodo} />
      <TodoFilter
        todosInProgress={todosInfo.inWork}
        allTodos={todosInfo.all}
        completedTodos={todosInfo.completed}
        activeFilter={activeFilter}
        getFilterTodos={filterTodos}
      />

      <TodoList
        todos={todos}
        changeTodo={changeTodo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
}
