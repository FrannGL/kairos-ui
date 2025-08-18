import { useState, useRef, useEffect, useId } from "react";

import { Input } from "./AutocompleteInput";
import { AutocompletePopup } from "./AutocompletePopup";
import { filterOptions } from "./filterOptions";
import styles from "./styles.module.scss";
import { useClickOutside } from "@/hooks/useClickOutside";

/**
 * Props para el componente Autocomplete.
 */
interface AutocompleteProps<T> {
  /** Valor seleccionado actualmente */
  value: T | null;

  /** Callback que se ejecuta al cambiar el valor */
  onChange: (value: T | null) => void;

  /** Label del input */
  label: string;

  /** Lista de opciones disponibles */
  options: T[];

  /** Nombre del input (para formularios) */
  name?: string;

  /** Deshabilita el input */
  disabled?: boolean;

  /** Mensaje de error a mostrar */
  error?: string;

  /** Indica si el campo fue tocado (usado en formularios) */
  touched?: boolean;

  /** Función para renderizar la etiqueta visible de cada opción */
  getOptionLabel: (option: T) => string;

  /** Función opcional para obtener un identificador único de cada opción */
  getOptionValue?: (option: T) => string | number;
}

/**
 * `Autocomplete` es un componente de entrada con sugerencias,
 * que permite seleccionar una opción de una lista filtrable.
 *
 * - Soporta navegación por teclado (↑, ↓, Enter, Escape).
 * - Permite limpiar el valor seleccionado.
 * - Cierra el menú automáticamente al hacer click fuera.
 *
 * Ejemplo de uso
 * ```tsx
 * <Autocomplete<Option>
 *   label="País"
 *   value={selectedCountry}
 *   options={countries}
 *   onChange={setSelectedCountry}
 *   getOptionLabel={(c) => c.name}
 *   getOptionValue={(c) => c.code}
 * />
 * ```
 */
export const Autocomplete = <T,>({
  value,
  onChange,
  label,
  name,
  options,
  disabled = false,
  error,
  touched,
  getOptionLabel,
  getOptionValue,
}: AutocompleteProps<T>) => {
  const initialInputValue = value ? getOptionLabel(value) : "";

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [filteredOptions, setFilteredOptions] = useState(() =>
    filterOptions(options, initialInputValue, getOptionLabel)
  );
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setOpen(false));

  const id = useId();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!open) setOpen(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  const handleOptionSelect = (option: T) => {
    onChange(option);
    setInputValue(getOptionLabel(option));
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, filteredOptions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleOptionSelect(filteredOptions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleClear = () => {
    onChange(null);
    setInputValue("");
    setOpen(false);
  };

  useEffect(() => {
    setFilteredOptions(filterOptions(options, inputValue, getOptionLabel));
    setHighlightedIndex(-1);
  }, [inputValue, options, getOptionLabel]);

  useEffect(() => {
    setInputValue(value ? getOptionLabel(value) : "");
  }, [value, getOptionLabel]);

  return (
    <div
      className={styles.autocomplete}
      ref={wrapperRef}
      tabIndex={-1}
      onBlur={handleBlur}
      data-testid="autocomplete-wrapper"
    >
      <Input
        id={id}
        label={label}
        name={name}
        value={inputValue}
        placeholder={value ? "" : label}
        disabled={disabled}
        error={error}
        touched={touched}
        hasValue={!!value}
        open={open}
        onChange={handleInputChange}
        onClear={handleClear}
        onFocus={() => {
          if (!disabled) setOpen(true);
        }}
        onToggle={() => {
          if (!disabled) setOpen(!open);
        }}
        onKeyDown={handleKeyDown}
      />

      {open && (
        <AutocompletePopup
          options={filteredOptions}
          value={value}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          onSelect={handleOptionSelect}
          highlightedIndex={highlightedIndex}
        />
      )}
    </div>
  );
};
