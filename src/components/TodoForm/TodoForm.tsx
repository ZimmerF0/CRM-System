import { useState } from "react";
import { addTask } from "../../api/tasksAPI";
import { validateTitle } from "../../helpers/validateTitle";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input";

import styles from "./TodoForm.module.css";


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

    const trimmed = title.trim(); // функция валидации вводимого текста
    const error = validateTitle(trimmed);
    if (error) {
      alert(error);
      return;
    }

    try {
      setIsSubmitting(true);
      await addTodo(trimmed);
      setTitle("");
      onCreated?.();
    } catch {
      alert("Не удалось добавить новую задачу");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles["input-form"]} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Add todo item"
        value={title}
        onChange={setTitle}
      />
      <Button type="submit">
        Add
      </Button>
    </form>
  );
}
