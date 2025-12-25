import editImg from "../assets/edit.svg";
import deleteImg from "../assets/delete.svg";

export function TodoItem({ todo, toggleTodo, deleteTodo, changeTodo }) {
  return (
    <div>
      <ul className="todo">
        <li className={todo.completed && "completed"}>
          <input className="checkbox" type="checkbox" onClick={() => toggleTodo(todo.id)} />
          {todo.text}
          <img
            className="edit"
            src={editImg}
            onClick={() => changeTodo(todo.id)}
            
          />
          <img
            className="delete"
            src={deleteImg}
            onClick={() => deleteTodo(todo.id)}
          />
        </li>
      </ul>
    </div>
  );
}
