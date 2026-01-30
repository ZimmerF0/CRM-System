import styles from "./Checkbox.module.css"

interface Props {
  className?: string;
  checked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ checked, onChange }: Props) => {
  return (
    <input
      type="checkbox"
      className={styles.checkbox}
      checked={checked}
      onChange={onChange}
    />
  );
};

