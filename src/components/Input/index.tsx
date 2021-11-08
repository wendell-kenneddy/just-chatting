import { InputHTMLAttributes, useState } from 'react';
import styles from './styles.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export function Input({ label, name, ...rest }: IInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={isFocused ? styles.inputFocused : ''}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        onFocus={() => setIsFocused(true)}
        onBlur={e =>
          e.target.value === '' ? setIsFocused(false) : setIsFocused(true)
        }
        {...rest}
      />
    </div>
  );
}
