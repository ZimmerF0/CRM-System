import { Checkbox } from 'antd';

import styles from "./Checkbox.module.css"

interface Props {
  className?: string;
  checked: boolean;
  onChange: () => void;
}

export const CheckboxBtn = ({ checked, onChange }: Props) => {
  return (
    <Checkbox
      className={styles.checkbox}
      checked={checked}
      onChange={onChange}
    />
  );
};

