import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SelectPopup } from "./SelectPopup/SelectPopup";
import styles from "./Select.module.scss";

export interface SelectOption {
  /** Valor interno de la opción */
  value: string | number;
  /** Texto a mostrar */
  label: string;
}

export interface SelectProps {
  /** Label del select */
  label: string;
  /** Nombre del select */
  name?: string;
  /** Valor seleccionado */
  value: string | number | null;
  /** Lista de opciones */
  options: SelectOption[];
  /** Deshabilita el select */
  disabled?: boolean;
  /** Mensaje de error */
  error?: string;
  /** Indica si el campo fue tocado */
  touched?: boolean;
  /** Callback al cambiar el valor */
  onChange: (value: string | number) => void;
}

/**
 * `Select` es un componente de lista desplegable controlada.
 *
 * - Permite seleccionar un valor de una lista de opciones.
 * - Soporta deshabilitado (`disabled`), mostrando el texto en gris.
 * - Muestra mensajes de error cuando `touched` y `error` están definidos.
 * - Cierra automáticamente el menú al hacer click fuera.
 *
 * Ejemplo de uso:
 * ```tsx
 * const [country, setCountry] = useState<string | number | null>(null);
 * const options = [
 *   { value: "mx", label: "México" },
 *   { value: "ar", label: "Argentina" },
 *   { value: "us", label: "Estados Unidos" },
 * ];
 *
 * <Select
 *   label="País"
 *   value={country}
 *   options={options}
 *   onChange={setCountry}
 *   error={country === null ? "Debe seleccionar un país" : undefined}
 *   touched={true}
 * />
 * ```
 */
export const Select = ({
  label,
  value,
  options,
  disabled = false,
  error,
  touched,
  onChange,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setOpen(false));

  const selectedOption = options.find((opt) => opt.value === value) || null;

  const handleToggle = () => {
    if (!disabled) setOpen((prev) => !prev);
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <>
      <div
        className={`${styles.selectContainer} ${
          disabled ? styles.disabled : ""
        } ${touched && error ? styles.error : ""}`}
        ref={wrapperRef}
      >
        <label
          className={`${styles.label} ${disabled ? styles.disabled : ""} ${
            touched && error ? styles.errorLabel : ""
          }`}
        >
          {label}
        </label>

        <div className={styles.selectWrapper}>
          <div
            className={`${styles.selectedValue} ${
              disabled ? styles.disabledText : ""
            } ${touched && error ? styles.errorText : ""}`}
            onClick={handleToggle}
          >
            {selectedOption?.label || "Selecciona una opción ..."}
            <img
              src="/assets/icons/arrow.svg"
              alt="arrow-icon"
              className={`${styles.dropdownIcon} ${open ? styles.rotate : ""}`}
            />
          </div>

          {open && (
            <SelectPopup
              options={options}
              value={value}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>
      {touched && error && <div className={styles.errorMessage}>{error}</div>}
    </>
  );
};
