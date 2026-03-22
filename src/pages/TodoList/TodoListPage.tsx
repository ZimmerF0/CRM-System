import { useCallback, useEffect, useState } from "react";

import { TodoForm } from "../../components/TodoForm/TodoForm";
import { TodoFilter } from "../../components/TodoFilter/TodoFilter";
import { TodoList } from "../../components/TodoList/TodoList";

import { getFilteredTask } from "../../api/tasksAPI";
import type { FilterType, Todo, TodoInfo } from "../../types/todo";
import styles from "./TodoListPage.module.css";

export default function TodoListPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosInfo, setTodosInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0
  });

  const refresh = useCallback(async () => {
    const data = await getFilteredTask(activeFilter);
    setTodos(data.data);
    if (data.info) {
      setTodosInfo(data.info);
    }
  }, [activeFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    const intervalId = setInterval(() => {
      refresh();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [refresh]);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>TodoList</h1>

      <TodoForm onCreated={refresh} />

      <TodoFilter
        todosInProgress={todosInfo.inWork}
        allTodos={todosInfo.all}
        completedTodos={todosInfo.completed}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <TodoList todos={todos} refresh={refresh} />
    </div>
  );
}
