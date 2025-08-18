import styles from "./styles.module.scss";

interface InputProps {
  id?: string;
  label: string;
  name?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  hasValue: boolean;
  open: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onToggle: () => void;
  onFocus: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({
  id,
  label,
  name,
  value,
  placeholder,
  disabled,
  error,
  touched,
  hasValue,
  open,
  onChange,
  onClear,
  onToggle,
  onFocus,
  onKeyDown,
}: InputProps) => {
  const inputId = id;

  return (
    <>
      {name && <p className={styles.inputName}>{name}</p>}
      <div
        className={`${styles.inputContainer} ${
          touched && error ? styles.error : ""
        }`}
      >
        <label
          htmlFor={inputId}
          className={`${styles.label} ${
            touched && error ? styles.errorLabel : ""
          }`}
        >
          {label}
        </label>
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.inputField} ${
            hasValue ? styles.selectedValue : ""
          }`}
        />

        {hasValue && (
          <span className={styles.clearIcon} onClick={onClear}>
            ×
          </span>
        )}

        <img
          src="/assets/icons/arrow.svg"
          alt="arrow-icon"
          className={`${styles.dropdownIcon} ${open ? styles.rotate : ""}`}
          onClick={onToggle}
        />
      </div>

      {touched && error && <div className={styles.errorMessage}>{error}</div>}
    </>
  );
};
