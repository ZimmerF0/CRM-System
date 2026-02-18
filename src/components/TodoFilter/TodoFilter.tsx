import { Button } from "antd";

import type { FilterType } from "../../types/todo";

import styles from "./TodoFilter.module.css";

interface TodoFilterProps {
  allTodos: number;
  todosInProgress: number;
  completedTodos: number;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function TodoFilter({
  allTodos,
  todosInProgress,
  completedTodos,
  activeFilter,
  onFilterChange,
}: TodoFilterProps) {
  return (
    <div className={styles.filter}>
      <Button
        size="large"
        type="text"
        className={activeFilter === "all" ? styles.active : ""}
        onClick={() => onFilterChange("all")}
      >
        Все({allTodos})
      </Button>

      <Button
        size="large"
        type="text"
        className={activeFilter === "inWork" ? styles.active : ""}
        onClick={() => onFilterChange("inWork")}
      >
        В прогрессе({todosInProgress})
      </Button>

      <Button
        size="large"
        type="text"
        className={activeFilter === "completed" ? styles.active : ""}
        onClick={() => onFilterChange("completed")}
      >
        Завершенные({completedTodos})
      </Button>
    </div>
  );
}
