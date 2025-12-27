import { useState } from "react";

export function TodoFilter({ allTodos, todosInProgress, editTodo }) {
  const [activeFilter, setActiveFilter] = useState("all"); 

  return (
    <div className="filter">
      <span
        className={activeFilter === "all" ? "active" : ""}
        onClick={() => setActiveFilter("all")}
      >
        Все({allTodos})
      </span>

      <span
        className={activeFilter === "progress" ? "active" : ""}
        onClick={() => setActiveFilter("progress")}
      >
        В прогрессе({todosInProgress})
      </span>

      <span
        className={activeFilter === "completed" ? "active" : ""}
        onClick={() => setActiveFilter("completed")}
      >
        Завершенные({editTodo})
      </span>
    </div>
  );
}
