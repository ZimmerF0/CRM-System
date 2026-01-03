import { TodoForm } from "./components/TodoForm.tsx";
import { TodoItem } from "./components/TodoItem.tsx";
import { TodoFilter } from "./components/TodoFilter.tsx";
import "./App.css";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "progress" | "completed";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState(0);
  const [allTodos, setAllTodos] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterType>(["all"]);

  const addTodo = (value: string) => {
    if (value) {
      const newTodo = {
        id: Date.now(),
        text: value,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setAllTodos(allTodos + 1);
    }
  };

  const deleteTodo = (id: number) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (todoToDelete?.completed) {
      setEditTodo(editTodo - 1);
    }
    setTodos([...todos.filter(todo => todo.id !== id)]);
    setAllTodos(allTodos - 1);
  };

  function changeTodo(id, newText) {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  }

  const toggleTodo = (id: number) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    if (!todoToToggle) return;

    if (todoToToggle.completed) {
      setEditTodo(editTodo - 1);
    } else {
      setEditTodo(editTodo + 1);
    }

    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const getFilterTodos = () => {
    switch (activeFilter) {
      case "all":
        return todos;
      case "progress":
        return todos.filter(todo => !todo.completed);
      case "completed":
        return todos.filter(todo => todo.completed);
      default:
        return todos; 
    }
  }

  const todosInProgress = todos.filter(todo => !todo.completed).length;

  return (
    <div className="main">
      <h1 className="title">TodoList</h1>
      <TodoForm addTodo={addTodo} />
      <TodoFilter
        todosInProgress={todosInProgress}
        allTodos={allTodos}
        editTodo={editTodo}
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
