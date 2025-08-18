import { describe, it, expect, vi } from "vitest";
import { Autocomplete } from "@/components/Autocomplete";
import { render, screen, fireEvent } from "@testing-library/react";

const options = [
  {
    alianzaCod: 2633262,
    alianzaDesc: "BETA MOTOR ARG SA BETA MOTOR ARGENTINA",
  },
  { alianzaCod: 8359445, alianzaDesc: "CORVEN MOTORS ARGENTCORVEN MOTORS ARG" },
  { alianzaCod: 24959186, alianzaDesc: "FAMSA FAMSA FABRICA ARGENT" },
];

describe("Autocomplete", () => {
  it("renderiza con opciones y permite seleccionar una", () => {
    const handleChange = vi.fn();
    render(
      <Autocomplete
        value={null}
        onChange={handleChange}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
        getOptionValue={(o) => o.alianzaCod}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);

    options.forEach((opt) =>
      expect(screen.getByText(opt.alianzaDesc)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("CORVEN MOTORS ARGENTCORVEN MOTORS ARG"));
    expect(handleChange).toHaveBeenCalledWith(options[1]);
  });

  it("filtra opciones según el input", () => {
    render(
      <Autocomplete
        value={null}
        onChange={() => {}}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "FAMSA" } });

    expect(screen.getByText("FAMSA FAMSA FABRICA ARGENT")).toBeInTheDocument();
    expect(
      screen.queryByText("BETA MOTOR ARG SA BETA MOTOR ARGENTINA")
    ).toBeNull();
  });

  it("actualiza inputValue al cambiar el value externo", () => {
    const { rerender, getByDisplayValue } = render(
      <Autocomplete
        value={null}
        onChange={() => {}}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
      />
    );

    rerender(
      <Autocomplete
        value={options[2]}
        onChange={() => {}}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
      />
    );
    expect(getByDisplayValue("FAMSA FAMSA FABRICA ARGENT")).toBeInTheDocument();
  });

  it("renderiza con value no presente en options", () => {
    render(
      <Autocomplete
        value={{ alianzaCod: 999, alianzaDesc: "No existe" }}
        onChange={() => {}}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
        getOptionValue={(o) => o.alianzaCod}
      />
    );
    expect(screen.getByDisplayValue("No existe")).toBeInTheDocument();
  });

  it("maneja blur correctamente con relatedTarget", () => {
    render(
      <Autocomplete
        value={null}
        onChange={() => {}}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
      />
    );

    const wrapper = screen.getByTestId("autocomplete-wrapper");

    fireEvent.focus(screen.getByRole("textbox"));
    fireEvent.blur(wrapper, { relatedTarget: wrapper });

    expect(wrapper).toBeInTheDocument();
  });

  it("maneja keyDown: ArrowDown, ArrowUp, Enter, Escape", async () => {
    const handleChange = vi.fn();
    render(
      <Autocomplete
        value={null}
        onChange={handleChange}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
      />
    );

    const input = screen.getByRole("textbox");

    // Abrir dropdown
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });

    const option1 = await screen.findByText(
      "BETA MOTOR ARG SA BETA MOTOR ARGENTINA"
    );
    expect(option1).toBeInTheDocument();

    // Navegación
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowUp" });

    // Seleccionar con Enter
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith(options[0]);

    // Cerrar con Escape
    fireEvent.keyDown(input, { key: "Escape" });
    expect(
      screen.queryByText("BETA MOTOR ARG SA BETA MOTOR ARGENTINA")
    ).toBeNull();
  });

  it("no abre dropdown si está disabled", () => {
    render(
      <Autocomplete
        value={options[0]}
        onChange={() => {}}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
        disabled
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    expect(screen.queryByText("Opción 1")).toBeNull();
  });

  it("limpia input con handleClear", () => {
    const handleChange = vi.fn();
    render(
      <Autocomplete
        value={options[0]}
        onChange={handleChange}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);

    const clearIcon = screen.getByText("×");
    fireEvent.click(clearIcon);

    expect(screen.queryByText("Opción 1")).toBeNull();
    expect(input).toHaveValue("");
  });

  it("renderiza name cuando se pasa prop name", () => {
    render(
      <Autocomplete
        value={null}
        onChange={() => {}}
        label="Test"
        name="miName"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
      />
    );

    expect(screen.getByText("miName")).toBeInTheDocument();
  });

  it("muestra mensaje de error cuando touched y error definidos", () => {
    render(
      <Autocomplete
        value={null}
        onChange={() => {}}
        label="Test"
        options={options}
        touched
        error="Error de prueba"
        getOptionLabel={(o) => o.alianzaDesc}
      />
    );

    expect(screen.getByText("Error de prueba")).toBeInTheDocument();
  });

  it("abre y cierra dropdown con onFocus y onToggle", () => {
    render(
      <Autocomplete
        value={null}
        onChange={() => {}}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    expect(
      screen.getByText("BETA MOTOR ARG SA BETA MOTOR ARGENTINA")
    ).toBeInTheDocument();

    const arrow = screen.getByAltText("arrow-icon");
    fireEvent.click(arrow);
    expect(
      screen.queryByText("BETA MOTOR ARG SA BETA MOTOR ARGENTINA")
    ).toBeNull();
  });

  it("selección usando getOptionValue", async () => {
    const handleChange = vi.fn();
    render(
      <Autocomplete
        value={null}
        onChange={handleChange}
        label="Test"
        options={options}
        getOptionLabel={(o) => o.alianzaDesc}
        getOptionValue={(o) => o.alianzaCod}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleChange).toHaveBeenCalledWith(options[0]);
  });
});
