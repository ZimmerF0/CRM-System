import { Button } from "antd";
import type { ButtonProps } from "antd";

const Btn = ({ children, ...props }: ButtonProps) => {
  return (
    <Button type="primary" size="large" {...props}>
      {children}
    </Button>
  );
};

export default Btn;
