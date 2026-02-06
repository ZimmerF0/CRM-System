import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import styles from "./ConfirmButton.module.css";

interface ConfirmButtonProps {
  className: string;
  onClick: () => void;
}

export const ConfirmButton = ({ onClick }: ConfirmButtonProps) => {
  return (
    <Button
      className={styles.edit}
      color="primary"
      variant="solid"
      onClick={onClick}
    >
      <CheckOutlined className={styles.svg} />
    </Button>
  );
};