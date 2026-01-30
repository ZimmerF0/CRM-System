import styles from "./Button.module.css";

interface Props {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ type, children, onClick }: Props) => {
  return (
    <button className={styles.btn} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
