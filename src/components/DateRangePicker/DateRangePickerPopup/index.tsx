import dayjs, { Dayjs } from "dayjs";
import styles from "./styles.module.scss";

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

/**
 * Props del subcomponente DateRangePickerPopup.
 */
interface DateRangePickerPopupProps {
  /** Fecha de inicio del rango seleccionado */
  startDate: Dayjs | null;

  /** Fecha de fin del rango seleccionado */
  endDate: Dayjs | null;

  /** Fecha actualmente "hovered" para vista de rango */
  hoverDate: Dayjs | null;

  /** Función para actualizar la fecha hover */
  setHoverDate: (date: Dayjs | null) => void;

  /** Mes actualmente visible en el calendario */
  viewDate: Dayjs;

  /** Función para actualizar el mes visible */
  setViewDate: (date: Dayjs) => void;

  /** Callback cuando se selecciona un día */
  handleSelectDate: (day: number, month: number, year: number) => void;

  /** Callback para limpiar las fechas seleccionadas */
  handleClear: () => void;

  /** Callback para actualizar el rango desde quick ranges */
  onChange: (value: [Dayjs | null, Dayjs | null]) => void;

  /** Callback para cerrar el popup */
  setOpen: (open: boolean) => void;
}

export const DateRangePickerPopup = ({
  startDate,
  endDate,
  hoverDate,
  setHoverDate,
  viewDate,
  setViewDate,
  handleSelectDate,
  handleClear,
  onChange,
  setOpen,
}: DateRangePickerPopupProps) => {
  const monthsToRender = viewDate ? [viewDate, viewDate.add(1, "month")] : [];

  const isInRange = (day: number, month: number, year: number) => {
    if (!startDate) return false;
    const d = dayjs(`${year}-${month + 1}-${day}`, "YYYY-M-D");
    const tempEnd = hoverDate && !endDate ? hoverDate : endDate;
    return tempEnd
      ? d.isAfter(startDate.subtract(1, "day")) &&
          d.isBefore(tempEnd.add(1, "day"))
      : d.isSame(startDate, "day");
  };

  const prevMonth = () => setViewDate(viewDate.subtract(1, "month"));
  const nextMonth = () => setViewDate(viewDate.add(1, "month"));

  // Función para manejar rangos rápidos
  const handleQuickRange = (
    range: "today" | "yesterday" | "last7" | "last30"
  ) => {
    const today = dayjs().startOf("day");
    let start: Dayjs | null = null;
    let end: Dayjs | null = null;

    switch (range) {
      case "today":
        start = today;
        end = null;
        break;
      case "yesterday":
        start = today.subtract(1, "day");
        end = null;
        break;
      case "last7":
        start = today.subtract(6, "day");
        end = today;
        break;
      case "last30":
        start = today.subtract(29, "day");
        end = today;
        break;
    }

    onChange([start, end]);
    if (start) setViewDate(start);
  };

  return (
    <div className={styles.calendarPopup}>
      <div className={styles.monthsRow}>
        {monthsToRender.map((monthDate) => {
          const year = monthDate.year();
          const month = monthDate.month();
          const daysInMonth = monthDate.daysInMonth();

          return (
            <div
              key={`${month}-${year}`}
              className={styles.monthWrapper}
              data-testid="month-wrapper"
            >
              <div className={styles.monthHeader}>
                <button className={styles.arrow} onClick={prevMonth}>
                  &lt;
                </button>
                <div className={styles.monthTitle}>
                  {`${monthNames[month]} ${year}`}
                </div>
                <button className={styles.arrow} onClick={nextMonth}>
                  &gt;
                </button>
              </div>

              <div className={styles.daysGrid}>
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                  (day) => (
                    <div
                      key={day}
                      data-testid={`day-${day}-${month}-${year}`}
                      className={`${styles.day} ${
                        isInRange(day, month, year) ? styles.inRange : ""
                      } ${
                        (startDate &&
                          startDate.isSame(
                            dayjs(`${year}-${month + 1}-${day}`, "YYYY-M-D"),
                            "day"
                          )) ||
                        (endDate &&
                          endDate.isSame(
                            dayjs(`${year}-${month + 1}-${day}`, "YYYY-M-D"),
                            "day"
                          ))
                          ? styles.selectedDay
                          : ""
                      }`}
                      onMouseEnter={() =>
                        setHoverDate(
                          dayjs(`${year}-${month + 1}-${day}`, "YYYY-M-D")
                        )
                      }
                      onMouseLeave={() => setHoverDate(null)}
                      onClick={() => handleSelectDate(day, month, year)}
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.divider} />

      <div className={styles.quickRanges}>
        <div className={styles.buttonsContainer}>
          <button onClick={() => handleQuickRange("today")}>Hoy</button>
          <button onClick={() => handleQuickRange("yesterday")}>Ayer</button>
          <button onClick={() => handleQuickRange("last7")}>
            Últimos 7 días
          </button>
          <button onClick={() => handleQuickRange("last30")}>
            Últimos 30 días
          </button>
        </div>
        <div className={styles.actions}>
          <button onClick={handleClear}>Resetear</button>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
