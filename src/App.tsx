import { TodoForm } from "./components/TodoForm.tsx";
import { TodoItem } from "./components/TodoItem.tsx";
import { TodoFilter } from "./components/TodoFilter.tsx";
import "./App.css";
import { useEffect, useState } from "react";

// interface TodoRequest {
//   title?: string;
//   isDone?: boolean; // изменение статуса задачи происходит через этот флаг
// }

// interface MetaResponse<T, N> {
//   data: T[];
//   info?: N;
//   meta: {
//     totalAmount: number;
//   };
// }


interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

interface TodoInfo { 
	all: number
	completed: number
	inWork: number
}

type FilterType = "all" | "inWork" | "completed";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [todosInfo, setTodosInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

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
          getFilterTodos(activeFilter);
        });
    }
  };

  const deleteTodo = (id: number) => {
    fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos([...todos.filter(todo => todo.id !== id)]);
      getFilterTodos(activeFilter);
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
      getFilterTodos(activeFilter);
    });
  };

  const getFilterTodos = (status: FilterType) => {
    fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
      .then(response => response.json())
      .then(data => {
        setTodos(data.data);
        setTodosInfo(data.info);
        setActiveFilter(status);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getFilterTodos("all");
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
        getFilterTodos={getFilterTodos}
      />

      {todos.map(todo => (
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
