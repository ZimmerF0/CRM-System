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
      className={styles.confirm}
      color="primary"
      variant="solid"
      onClick={onClick}
      icon={<CheckOutlined style={{fontSize:30}} />}
    ></Button>
  );
};
