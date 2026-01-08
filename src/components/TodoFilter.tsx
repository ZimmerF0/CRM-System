/* eslint-disable @typescript-eslint/no-explicit-any */

export function TodoFilter({
  allTodos,
  todosInProgress,
  completedTodos,
  activeFilter,
  setActiveFilter,
}: any) {
  return (
    <div className="filter">
      <button
        className={activeFilter === "all" ? "active" : ""}
        onClick={() => setActiveFilter("all")}
      >
        Все({allTodos})
      </button>

      <button
        className={activeFilter === "inWork" ? "active" : ""}
        onClick={() => setActiveFilter("inWork")}
      >
        В прогрессе({todosInProgress})
      </button>

      <button
        className={activeFilter === "completed" ? "active" : ""}
        onClick={() => setActiveFilter("completed")}
      >
        Завершенные({completedTodos})
      </button>
    </div>
  );
}
