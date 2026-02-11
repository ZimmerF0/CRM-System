import type { ReactNode } from "react";
import styles from "./IconButton.module.css";

type Variant = "primary" | "secondary" | "danger";

interface IconButtonProps {
  variant: Variant;
  icon: ReactNode;
  onClick: () => void;
}

export const IconButton = ({ variant, icon, onClick }: IconButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.action} ${styles[variant]}`}
      onClick={onClick}
      aria-label={variant}
    >
      {icon}
    </button>
  );
};
