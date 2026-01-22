import { useState } from "react";
import { addTask } from "../api/tasksAPI";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface TodoFormProps {
  onCreated?: () => void;
}

export function TodoForm({ onCreated }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTodo = async (title: string) => {
    const newTodo = { title, isDone: false };
    await addTask(newTodo);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedValue = title.trim();

    if (!trimmedValue) {
      alert("Поле содержит только пробелы или пустое!");
      return;
    }
    if (trimmedValue.length < 2 || trimmedValue.length > 64) {
      alert("Длина текста должна быть от 2 до 64 символов");
      return;
    }

    try {
      setIsSubmitting(true);
      await addTodo(trimmedValue);
      setTitle("");
      onCreated?.();
    } catch (error) {
      alert("Не удалось добавить новую задачу");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Add todo item"
        value={title}
        onChange={(value) => setTitle(value)}
      />
      <Button className="btn" type="submit">
        Add
      </Button>
    </form>
  );
}
