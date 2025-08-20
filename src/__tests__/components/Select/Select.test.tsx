import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select, type SelectOption } from "@/components/Select";

const options: SelectOption[] = [
  { value: "mx", label: "México" },
  { value: "ar", label: "Argentina" },
  { value: "us", label: "Estados Unidos" },
];

describe("Componente <Select />", () => {
  it("renderiza el label y el placeholder", () => {
    render(
      <Select label="País" value={null} options={options} onChange={() => {}} />
    );

    expect(screen.getByText("País")).toBeInTheDocument();
    expect(screen.getByText("Selecciona una opción ...")).toBeInTheDocument();
  });

  it("abre el popup al hacer click", () => {
    render(
      <Select label="País" value={null} options={options} onChange={() => {}} />
    );

    const trigger = screen.getByText("Selecciona una opción ...");
    fireEvent.click(trigger);

    expect(screen.getByText("México")).toBeInTheDocument();
    expect(screen.getByText("Argentina")).toBeInTheDocument();
  });

  it("selecciona una opción y dispara onChange", () => {
    const handleChange = vi.fn();
    render(
      <Select
        label="País"
        value={null}
        options={options}
        onChange={handleChange}
      />
    );

    const trigger = screen.getByText("Selecciona una opción ...");
    fireEvent.click(trigger);

    const mexicoOption = screen.getByText("México");
    fireEvent.click(mexicoOption);

    expect(handleChange).toHaveBeenCalledWith("mx");
  });

  it("muestra mensaje de error cuando touched y error están definidos", () => {
    render(
      <Select
        label="País"
        value={null}
        options={options}
        onChange={() => {}}
        touched={true}
        error="Debe seleccionar un país"
      />
    );

    expect(screen.getByText("Debe seleccionar un país")).toBeInTheDocument();
  });

  it("no abre el popup cuando está disabled", () => {
    render(
      <Select
        label="País"
        value={null}
        options={options}
        onChange={() => {}}
        disabled
      />
    );

    const trigger = screen.getByText("Selecciona una opción ...");
    fireEvent.click(trigger);

    expect(screen.queryByText("México")).not.toBeInTheDocument();
  });
});
