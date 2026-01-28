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
      <button
        className={activeFilter === "all" ? styles.active : ""}
        onClick={() => getFilterTodos("all")}
      >
        Все({allTodos})
      </button>

      <button
        className={activeFilter === "inWork" ? styles.active : ""}
        onClick={() => getFilterTodos("inWork")}
      >
        В прогрессе({todosInProgress})
      </button>

      <button
        className={activeFilter === "completed" ? styles.active : ""}
        onClick={() => getFilterTodos("completed")}
      >
        Завершенные({completedTodos})
      </button>
    </div>
  );
}
