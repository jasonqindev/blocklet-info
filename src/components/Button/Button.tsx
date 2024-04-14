import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import Spin from '../Icon/Spin';
import styles from './Button.module.css';

interface EnhancedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

const Button: FC<EnhancedButtonProps> = ({ isLoading = false, children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {!!isLoading ? <Spin /> : children}
    </button>
  );
};

export default Button;
