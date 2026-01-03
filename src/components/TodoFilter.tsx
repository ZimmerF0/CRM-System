/* eslint-disable @typescript-eslint/no-explicit-any */

export function TodoFilter({
  allTodos,
  todosInProgress,
  editTodo,
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
        className={activeFilter === "progress" ? "active" : ""}
        onClick={() => setActiveFilter("progress")}
      >
        В прогрессе({todosInProgress})
      </button>

      <button
        className={activeFilter === "completed" ? "active" : ""}
        onClick={() => setActiveFilter("completed")}
      >
        Завершенные({editTodo})
      </button>
    </div>
  );
}
