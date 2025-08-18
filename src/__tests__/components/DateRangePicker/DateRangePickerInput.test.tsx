import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import dayjs from "dayjs";
import { DateRangePickerInput } from "@/components/DateRangePicker/DateRangePickerInput";

describe("DateRangePickerInput", () => {
  const startDate = dayjs("2025-08-18");
  const endDate = dayjs("2025-08-20");

  it("muestra el rango de fechas seleccionado", () => {
    render(
      <DateRangePickerInput
        startDate={startDate}
        endDate={endDate}
        open={false}
        setOpen={vi.fn()}
        label="Rango de fechas"
        onClear={vi.fn()}
      />
    );

    expect(
      screen.getByDisplayValue("18/08/2025 - 20/08/2025")
    ).toBeInTheDocument();
  });

  it("abre el calendario al hacer click en el input", () => {
    const setOpen = vi.fn();
    render(
      <DateRangePickerInput
        startDate={null}
        endDate={null}
        open={false}
        setOpen={setOpen}
        label="Rango de fechas"
        onClear={vi.fn()}
      />
    );

    fireEvent.click(screen.getByLabelText("Rango de fechas"));
    expect(setOpen).toHaveBeenCalledWith(true);
  });

  it("llama a onClear al hacer click en el icono de limpiar", () => {
    const onClear = vi.fn();
    render(
      <DateRangePickerInput
        startDate={startDate}
        endDate={endDate}
        open={false}
        setOpen={vi.fn()}
        label="Rango de fechas"
        onClear={onClear}
      />
    );

    fireEvent.click(screen.getByText("×"));
    expect(onClear).toHaveBeenCalled();
  });

  it("no abre el calendario si está deshabilitado", () => {
    const setOpen = vi.fn();
    render(
      <DateRangePickerInput
        startDate={null}
        endDate={null}
        open={false}
        setOpen={setOpen}
        label="Rango de fechas"
        disabled
        onClear={vi.fn()}
      />
    );

    fireEvent.click(screen.getByLabelText("Rango de fechas"));
    expect(setOpen).not.toHaveBeenCalled();
  });
});
