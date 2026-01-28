import styles from "./Button.module.css"

interface Props {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ className, type, children, onClick }: Props) => {
  return (
    <button  className={`${styles.btn} ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;