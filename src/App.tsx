import { TodoForm } from "./components/TodoForm.tsx";
import { TodoItem } from "./components/TodoItem.tsx";
import { TodoFilter } from "./components/TodoFilter.tsx";
import "./App.css";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  created?: string; // ISO date string
  isDone: boolean;
}

type FilterType = "all" | "inWork" | "completed";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const addTodo = (value: string) => {
    if (value) {
      const newTodo = {
        title: value,
        isDone: false,
      };

      fetch("https://easydev.club/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then(response => response.json())
        .then(addedTask => {
          setTodos([...todos, addedTask]);
        });
    }
  };

  const deleteTodo = (id: number) => {
    fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos([...todos.filter(todo => todo.id !== id)]);
    });
  };

  const changeTodo = (id: number, newText: string) => {
    fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newText }),
    }).then(() => {
      setTodos(
        todos.map(todo => (todo.id === id ? { ...todo, title: newText } : todo))
      );
    });
  };

  const toggleTodo = (id: number) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    if (!todoToToggle) return;

    fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: !todoToToggle.isDone }),
    }).then(() => {
      setTodos(todos =>
        todos.map(todo =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    });
  };

  const getFilterTodos = () => {
    switch (activeFilter) {
      case "all":
        return todos;
      case "inWork":
        return todos.filter(todo => !todo.isDone);
      case "completed":
        return todos.filter(todo => todo.isDone);
      default:
        return todos;
    }
  };

  const allTodos = todos.length;
  const todosInProgress = todos.filter(todo => !todo.isDone).length;
  const completedTodos = todos.filter(todo => todo.isDone).length;

  useEffect(() => {
    fetch("https://easydev.club/api/v1/todos")
      .then(response => response.json())
      .then(data => setTodos(data.data));
  }, []);

  return (
    <div className="main">
      <h1 className="title">TodoList</h1>
      <TodoForm addTodo={addTodo} />
      <TodoFilter
        todosInProgress={todosInProgress}
        allTodos={allTodos}
        completedTodos={completedTodos}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {getFilterTodos().map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          changeTodo={changeTodo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </div>
  );
}
