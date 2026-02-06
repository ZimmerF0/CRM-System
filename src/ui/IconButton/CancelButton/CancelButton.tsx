import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import styles from "./CancelButton.module.css";

interface CancelButtonProps {
  className: string;
  onClick: () => void;
}

export const CancelButton = ({ onClick }: CancelButtonProps) => {
  return (
    <Button
      className={styles.cancel}
      style={{
              color: '#ffffff',
              background: 'grey'
            }}
      variant="text"
      onClick={onClick}
    >
      <CloseOutlined className={styles.svg} />
    </Button>
  );
};