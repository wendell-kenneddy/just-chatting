import React, { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'outlined' | 'contained';
  color: 'primary' | 'white' | 'error';
  children: Element | React.ReactNode;
}

export function Button({ variant, color, children, ...rest }: IButtonProps) {
  return (
    <button className={`${styles[variant]} ${styles[color]}`} {...rest}>
      {children}
    </button>
  );
}
