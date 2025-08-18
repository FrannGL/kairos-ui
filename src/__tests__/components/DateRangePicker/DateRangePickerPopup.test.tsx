import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import dayjs from "dayjs";
import { DateRangePickerPopup } from "@/components/DateRangePicker/DateRangePickerPopup";

describe("DateRangePickerPopup", () => {
  const startDate = dayjs("2025-08-18");
  const endDate = dayjs("2025-08-20");
  const handleSelectDate = vi.fn();
  const handleClear = vi.fn();
  const onChange = vi.fn();
  const setHoverDate = vi.fn();
  const setViewDate = vi.fn();
  const setOpen = vi.fn();

  it("renderiza los días del mes correctamente", () => {
    render(
      <DateRangePickerPopup
        startDate={startDate}
        endDate={endDate}
        hoverDate={null}
        setHoverDate={setHoverDate}
        viewDate={startDate}
        setViewDate={setViewDate}
        handleSelectDate={handleSelectDate}
        handleClear={handleClear}
        onChange={onChange}
        setOpen={setOpen}
      />
    );

    const firstMonth = screen.getAllByTestId("month-wrapper")[0];
    const day18 = within(firstMonth).getByTestId("day-18-7-2025");
    fireEvent.click(day18);
    expect(handleSelectDate).toHaveBeenCalledWith(18, 7, 2025);
  });

  it("llama a handleSelectDate al hacer click en un día", () => {
    render(
      <DateRangePickerPopup
        startDate={null}
        endDate={null}
        hoverDate={null}
        setHoverDate={setHoverDate}
        viewDate={startDate}
        setViewDate={setViewDate}
        handleSelectDate={handleSelectDate}
        handleClear={handleClear}
        onChange={onChange}
        setOpen={setOpen}
      />
    );

    const firstMonth = screen.getAllByTestId("month-wrapper")[0];
    const day18 = within(firstMonth).getByTestId("day-18-7-2025");
    fireEvent.click(day18);

    expect(handleSelectDate).toHaveBeenCalledWith(
      18,
      startDate.month(),
      startDate.year()
    );
  });

  it("llama a handleClear al hacer click en Resetear", () => {
    render(
      <DateRangePickerPopup
        startDate={startDate}
        endDate={endDate}
        hoverDate={null}
        setHoverDate={setHoverDate}
        viewDate={startDate}
        setViewDate={setViewDate}
        handleSelectDate={handleSelectDate}
        handleClear={handleClear}
        onChange={onChange}
        setOpen={setOpen}
      />
    );

    fireEvent.click(screen.getByText("Resetear"));
    expect(handleClear).toHaveBeenCalled();
  });

  it("selecciona quick range 'Últimos 7 días'", () => {
    render(
      <DateRangePickerPopup
        startDate={null}
        endDate={null}
        hoverDate={null}
        setHoverDate={setHoverDate}
        viewDate={startDate}
        setViewDate={setViewDate}
        handleSelectDate={handleSelectDate}
        handleClear={handleClear}
        onChange={onChange}
        setOpen={setOpen}
      />
    );

    fireEvent.click(screen.getByText("Últimos 7 días"));
    expect(onChange).toHaveBeenCalled();
  });

  it("puede cerrar el popup al Confirmar", () => {
    render(
      <DateRangePickerPopup
        startDate={startDate}
        endDate={endDate}
        hoverDate={null}
        setHoverDate={setHoverDate}
        viewDate={startDate}
        setViewDate={setViewDate}
        handleSelectDate={handleSelectDate}
        handleClear={handleClear}
        onChange={onChange}
        setOpen={setOpen}
      />
    );

    fireEvent.click(screen.getByText("Confirmar"));
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
