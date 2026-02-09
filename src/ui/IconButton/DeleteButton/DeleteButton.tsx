import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import styles from "./DeleteButton.module.css";

interface DeleteButtonProps {
  className: string;
  onClick: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <Button
      className={styles.delete}
      color="danger"
      variant="solid"
      onClick={onClick}
      icon={<DeleteOutlined style={{fontSize:30}} />}
    ></Button>
  );
};
