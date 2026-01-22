interface Props {
  className: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const Button = ({ className, type, children }: Props) => {
  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
};

export default Button;