import React from 'react';
import { Input } from 'antd';

import styles from "./Input.module.css"

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type: "text" | "password" | "email";
 
}

const InputText = ({ value, onChange, placeholder, type }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      className = {styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputText;
