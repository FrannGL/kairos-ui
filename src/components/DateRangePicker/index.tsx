import { useState, useRef } from "react";

import dayjs, { Dayjs } from "dayjs";
import { useClickOutside } from "@/hooks/useClickOutside";
import { DateRangePickerInput } from "./DateRangePickerInput";
import { DateRangePickerPopup } from "./DateRangePickerPopup";
import styles from "./styles.module.scss";

interface DatePickerProps {
  /** Rango de fechas seleccionado como tupla: [fechaInicio, fechaFin] */
  value: [Dayjs | null, Dayjs | null];

  /** Callback cuando cambia el rango de fechas */
  onChange: (value: [Dayjs | null, Dayjs | null]) => void;

  /** Etiqueta que se muestra arriba del input */
  label: string;

  /** Nombre opcional del input */
  name?: string;

  /** Deshabilita el DateRangePicker */
  disabled?: boolean;

  /** Mensaje de error a mostrar */
  error?: string;

  /** Indica si el input fue tocado */
  touched?: boolean;
}

/**
 * `DateRangePicker` es un componente de selección de fechas con soporte
 * para rangos y selección rápida.
 *
 * - Permite seleccionar un solo día o un rango de fechas.
 * - Soporta rangos rápidos como "Hoy", "Ayer", "Últimos 7 días" y "Últimos 30 días".
 * - Permite limpiar la selección de fechas.
 * - Muestra un calendario desplegable y cierra automáticamente al hacer click fuera.
 * - Mantiene un estado de hover para resaltar rangos parciales.
 *
 * Ejemplo de uso
 * ```tsx
 * <DateRangePicker
 *   label="Rango de fechas"
 *   value={[startDate, endDate]}
 *   onChange={(range) => setRange(range)}
 *   name="fecha"
 *   error={error}
 *   touched={touched}
 * />
 * ```
 */

export const DateRangePicker = ({
  value: [startDate, endDate],
  onChange,
  label,
  name,
  disabled,
  error,
  touched,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);
  const [viewDate, setViewDate] = useState(dayjs());
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setOpen(false));

  const handleClear = () => onChange([null, null]);

  const handleSelectDate = (day: number, month: number, year: number) => {
    const selected = dayjs(`${year}-${month + 1}-${day}`, "YYYY-M-D");
    if (!startDate || (startDate && endDate)) {
      onChange([selected, null]);
    } else if (startDate && !endDate) {
      if (selected.isBefore(startDate)) onChange([selected, startDate]);
      else onChange([startDate, selected]);
      setOpen(false);
    }
  };

  return (
    <div className={styles.datepicker} ref={wrapperRef}>
      {name && <p className={styles.inputName}>{name}</p>}
      <DateRangePickerInput
        startDate={startDate}
        endDate={endDate}
        open={open}
        setOpen={setOpen}
        label={label}
        disabled={disabled}
        touched={touched}
        error={error}
        onClear={handleClear}
      />
      {open && (
        <DateRangePickerPopup
          startDate={startDate}
          endDate={endDate}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          viewDate={viewDate}
          setViewDate={setViewDate}
          handleSelectDate={handleSelectDate}
          handleClear={handleClear}
          onChange={onChange}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};
