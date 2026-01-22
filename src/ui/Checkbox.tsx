interface Props {
  className?: string;
  checked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ className, checked, onChange }: Props) => {
  return (
    <input
      type="checkbox"
      className={className}
      checked={checked}
      onChange={onChange}
    />
  );
};

