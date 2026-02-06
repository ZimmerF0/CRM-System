import { Button } from 'antd';

interface Props {
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

const Btn = ({ htmlType, children }: Props) => {
  return (
    <Button type="primary" size='large' htmlType={htmlType}>
      {children}
    </Button>
  );
};

export default Btn;
