import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DateRangePicker } from "@/components/DateRangePicker";

describe("DateRangePicker", () => {
  it("renderiza correctamente con label y nombre", () => {
    render(
      <DateRangePicker
        label="Rango de fechas"
        name="fecha"
        value={[null, null]}
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText("Rango de fechas")).toBeInTheDocument();
    expect(screen.getByText("fecha")).toBeInTheDocument();
  });
});
