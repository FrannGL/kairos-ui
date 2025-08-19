import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Input } from "@/components/Input";

describe("Componente Input", () => {
  it("renderiza el label y el input", () => {
    render(<Input label="Email" value="" onChange={() => {}} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("muestra el mensaje de error cuando touched y error están definidos", () => {
    render(
      <Input
        label="Email"
        value=""
        touched
        error="Valor inválido"
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Valor inválido")).toBeInTheDocument();
  });

  it("llama a onChange al escribir en el input", () => {
    const handleChange = vi.fn();
    render(<Input label="Email" value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(handleChange).toHaveBeenCalledWith("test@example.com");
  });

  it("deshabilita el input cuando la propiedad disabled es true", () => {
    render(<Input label="Email" value="" onChange={() => {}} disabled />);

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("filtra los caracteres no numéricos cuando type='number'", () => {
    const handleChange = vi.fn();
    render(
      <Input label="Edad" value="" type="number" onChange={handleChange} />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "abc123" } });

    expect(handleChange).toHaveBeenCalledWith("123");
  });
});
