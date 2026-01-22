import type { FilterType } from "../types/todo";
import Button from "../ui/Button";

interface TodoFilterProps {
  allTodos: number,
  todosInProgress: number,
  completedTodos: number,
  activeFilter: FilterType,
  getFilterTodos: (filter: FilterType) => void,
}

export function TodoFilter({
  allTodos,
  todosInProgress,
  completedTodos,
  activeFilter,
  getFilterTodos,
}: TodoFilterProps) {
  return (
    <div className="filter">
      <Button
        className={activeFilter === "all" ? "active" : ""}
        onClick={() => getFilterTodos("all")}
      >
        Все({allTodos})
      </Button>

      <Button
        className={activeFilter === "inWork" ? "active" : ""}
        onClick={() => getFilterTodos("inWork")}
      >
        В прогрессе({todosInProgress})
      </Button>

      <Button
        className={activeFilter === "completed" ? "active" : ""}
        onClick={() => getFilterTodos("completed")}
      >
        Завершенные({completedTodos})
      </Button>
    </div>
  );
}
