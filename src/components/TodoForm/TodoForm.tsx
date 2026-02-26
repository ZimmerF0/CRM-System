import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { addTask } from "../../api/tasksAPI";
import { useDispatch } from "react-redux";

import { addTodo } from "../../store/slices/todoSlice";
import type { Todo } from "../../types/todo";

import styles from "./TodoForm.module.css";

type FormValues = { title: string };

export function TodoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm<FormValues>();

  const dispatch = useDispatch();

  const handleSubmit = async (values: FormValues) => {
    if (isSubmitting) return;

    const trimmed = values.title.trim();

    try {
      setIsSubmitting(true);
      const createdTodo: Todo = await addTask({
        title: trimmed,
        isDone: false,
      });

      dispatch(addTodo(createdTodo));

      form.resetFields();
    } catch {
      message.error("Не удалось добавить новую задачу");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form<FormValues>
      form={form}
      className={styles.form}
      onFinish={handleSubmit}
    >
      <Form.Item
        className={styles.item}
        name="title"
        rules={[
          {
            required: true,
            transform: value => value?.trim(),
            message: "Введите название",
          },
          {
            min: 2,
            transform: value => value?.trim(),
            message: "Минимум 2 символа",
          },
          {
            max: 64,
            transform: value => value?.trim(),
            message: "Максимум 64 символа",
          },
        ]}
      >
        <Input
          size="large"
          placeholder="Add todo item"
          style={{ fontSize: 16 }}
        />
      </Form.Item>

      <Button
        type="primary"
        size="large"
        htmlType="submit"
        disabled={isSubmitting}
      >
        Add
      </Button>
    </Form>
  );
}
