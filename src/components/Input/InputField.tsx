import { InputHTMLAttributes, FocusEvent, ChangeEvent, useEffect, useRef, useState, FC } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' | 'onChange'> {
  label?: string;
  errorMessage?: string;
  value?: string;
  id?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>, value: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  validations?: ((value: string) => string | void)[];
}

const InputField: FC<InputFieldProps> = ({
  label = '',
  errorMessage: error = '',
  value = '',
  type = 'text',
  validations,
  placeholder = '',
  id,
  onChange,
  onBlur,
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState(error);
  const caughtValidationRef = useRef<((value: string) => string | void) | null>(null);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    const validation = caughtValidationRef.current;
    if (validation) {
      const validated = validation(value);
      if (!validated) setErrorMessage('');
      caughtValidationRef.current = null;
    }
  }, [value, errorMessage]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e, e.target.value);

    if (errorMessage && !caughtValidationRef.current) setErrorMessage('');
  }

  function handleInputBlur(e: FocusEvent<HTMLInputElement>) {
    const value = e.target.value || '';
    onBlur && onBlur(e, value);

    if (validations?.length) {
      const caughtValidation = validations.find((va) => va(value));
      if (caughtValidation) {
        caughtValidationRef.current = caughtValidation;
        const errorMessage = caughtValidation(value) || '';
        setErrorMessage(errorMessage);
      }
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.control}>
        <input
          placeholder={placeholder}
          type={type}
          id={id}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          value={value}
          {...props}
        />
      </div>
      {!!errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default InputField;
