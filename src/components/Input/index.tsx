import { useId } from "react";
import styles from "./styles.module.scss";

export interface InputProps {
  /** Label del input */
  label: string;

  /** Nombre del input (para formularios) */
  name?: string;

  /** Tipo de input: "text" o "number" */
  type?: "text" | "number";

  /** Valor controlado del input */
  value: string;

  /** Placeholder a mostrar */
  placeholder?: string;

  /** Deshabilita el input */
  disabled?: boolean;

  /** Mensaje de error */
  error?: string;

  /** Indica si el campo fue tocado (para mostrar errores) */
  touched?: boolean;

  /** Callback al cambiar el valor */
  onChange: (value: string) => void;
}

export const Input = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  disabled = false,
  error,
  touched,
  onChange,
}: InputProps) => {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
      onChange(onlyNumbers);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <>
      <div
        className={`${styles.inputContainer} ${
          disabled ? styles.disabled : ""
        } ${touched && error ? styles.error : ""}`}
      >
        <label
          htmlFor={id}
          className={`${styles.label} ${disabled ? styles.disabled : ""} ${
            touched && error ? styles.errorLabel : ""
          }`}
        >
          {label}
        </label>
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.inputField}
          onChange={handleChange}
        />
      </div>
      {touched && error && <div className={styles.errorMessage}>{error}</div>}
    </>
  );
};
