import { useState } from "react";

interface TodoFormProps {
  addTodo: (todo: string) => void
}

export function TodoForm({ addTodo }: TodoFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      alert("Поле содержит только пробелы или пустое!");
      return;
    }
    if (trimmedValue.length < 2 || trimmedValue.length > 64) {
      alert("Длина текста должна быть от 2 до 64 символов");
      return;
    }
    addTodo(trimmedValue);
    setValue("");
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add todo item"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button className="btn" type="submit">
        Add
      </button>
    </form>
  );
}
