import { Dayjs } from "dayjs";
import styles from "./styles.module.scss";
import { useId } from "react";

/**
 * Props del subcomponente DateRangePicker.
 */
interface DateRangePickerInputProps {
  /** Fecha de inicio del rango */
  startDate: Dayjs | null;

  /** Fecha de fin del rango */
  endDate: Dayjs | null;

  /** Indica si el calendario está abierto */
  open: boolean;

  /** Función para abrir/cerrar el calendario */
  setOpen: (open: boolean) => void;

  /** Etiqueta que se muestra dentro del input */
  label: string;

  /** Deshabilita el input */
  disabled?: boolean;

  /** Estado de "tocado" para validación */
  touched?: boolean;

  /** Mensaje de error para validación */
  error?: string;

  /** Callback para limpiar las fechas seleccionadas */
  onClear: () => void;
}

export const DateRangePickerInput = ({
  startDate,
  endDate,
  open,
  setOpen,
  label,
  disabled,
  touched,
  error,
  onClear,
}: DateRangePickerInputProps) => {
  const id = useId();

  return (
    <>
      <div
        className={`${styles.inputContainer} 
          ${touched && error ? styles.error : ""} 
          ${disabled ? styles.disabled : ""}`}
      >
        <label
          htmlFor={id}
          className={`${styles.label} ${
            touched && error ? styles.errorLabel : ""
          } ${disabled ? styles.disabled : ""}`}
        >
          {label}
        </label>
        <input
          id={id}
          type="text"
          readOnly
          disabled={disabled}
          className={styles.inputField}
          value={
            startDate
              ? endDate
                ? `${startDate.format("DD/MM/YYYY")} - ${endDate.format(
                    "DD/MM/YYYY"
                  )}`
                : `${startDate.format("DD/MM/YYYY")}`
              : ""
          }
          onClick={() => {
            if (!disabled) setOpen(!open);
          }}
        />
        {(startDate || endDate) && (
          <span className={styles.clearIcon} onClick={onClear}>
            ×
          </span>
        )}
        <button
          type="button"
          className={styles.calendarButton}
          disabled={disabled}
          onClick={() => {
            if (!disabled) setOpen(!open);
          }}
        >
          <img
            src="../../../assets/icons/calendar.svg"
            alt="calendar"
            className={styles.endIcon}
          />
        </button>
      </div>
      {touched && error && <p className={styles.errorMessage}>{error}</p>}
    </>
  );
};
