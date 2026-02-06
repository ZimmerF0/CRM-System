import styles from "./IconButton.module.css";

type Variant =  "primary" | "secondary" | "danger" ;

interface IconButtonProps {
  variant: Variant;
  onClick: () => void;
}

export const IconButton = ({ variant, onClick }: IconButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.action} ${styles[variant]}`}
      onClick={onClick}
      aria-label={variant}
    >
      <img />
    </button>
  );
};
