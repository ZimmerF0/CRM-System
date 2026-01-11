/* eslint-disable @typescript-eslint/no-explicit-any */

export function TodoFilter({
  allTodos,
  todosInProgress,
  completedTodos,
  activeFilter,
  getFilterTodos,
}: any) {
  return (
    <div className="filter">
      <button
        className={activeFilter === "all" ? "active" : ""}
        onClick={() => getFilterTodos("all")}
      >
        Все({allTodos})
      </button>

      <button
        className={activeFilter === "inWork" ? "active" : ""}
        onClick={() => getFilterTodos("inWork")}
      >
        В прогрессе({todosInProgress})
      </button>

      <button
        className={activeFilter === "completed" ? "active" : ""}
        onClick={() => getFilterTodos("completed")}
      >
        Завершенные({completedTodos})
      </button>
    </div>
  );
}
