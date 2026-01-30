import styles from "./IconButton.module.css";

type Variant = "confirm" | "edit" | "delete" | "cancel";

interface IconButtonProps {
  variant: Variant;
  src: string;
  alt: string;
  onClick: () => void;
}

export const IconButton = ({ variant, src, alt, onClick }: IconButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.action} ${styles[variant]}`}
      onClick={onClick}
      aria-label={variant}
    >
      <img src={src} alt={alt} />
    </button>
  );
};
