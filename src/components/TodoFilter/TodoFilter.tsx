import { Button } from "antd";

import type { FilterType } from "../../types/todo";

import styles from "./TodoFilter.module.css";

interface TodoFilterProps {
  allTodos: number;
  todosInProgress: number;
  completedTodos: number;
  activeFilter: FilterType;
  getFilterTodos: (filter: FilterType) => void;
}

export function TodoFilter({
  allTodos,
  todosInProgress,
  completedTodos,
  activeFilter,
  getFilterTodos,
}: TodoFilterProps) {
  return (
    <div className={styles.filter}>
      <Button
        size="large"
        type="text"
        className={activeFilter === "all" ? styles.active : ""}
        onClick={() => getFilterTodos("all")}
      >
        Все({allTodos})
      </Button>

      <Button
        size="large"
        type="text"
        className={activeFilter === "inWork" ? styles.active : ""}
        onClick={() => getFilterTodos("inWork")}
      >
        В прогрессе({todosInProgress})
      </Button>

      <Button
        size="large"
        type="text"
        className={activeFilter === "completed" ? styles.active : ""}
        onClick={() => getFilterTodos("completed")}
      >
        Завершенные({completedTodos})
      </Button>
    </div>
  );
}
