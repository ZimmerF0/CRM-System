import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import styles from "./EditButton.module.css";

interface EditButtonProps {
  className: string;
  onClick: () => void;
}

export const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <Button
      className={styles.edit}
      color="primary"
      variant="solid"
      onClick={onClick}
    >
      <EditOutlined className={styles.svg} />
    </Button>
  );
};
