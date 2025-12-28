import { useState } from "react";

export function TodoForm({addTodo}) {
  const [value, setValue] = useState("");

  
  const handleSubmit = event => {
    event.preventDefault();
    addTodo(value);
    if(value === ""){
      alert('поле не можеыть пустым')
    }
    setValue("");
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add todo item"
        minLength={2}
        maxLength={64}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button className="btn" onClick={() => {
        
      }}>
        Add
      </button>
    </form>
  );
}
