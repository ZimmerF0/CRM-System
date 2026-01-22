interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type: "text" | "password" | "email";
}

const Input = ({ value, onChange, placeholder, type }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  onChange(e.target.value);
};

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
