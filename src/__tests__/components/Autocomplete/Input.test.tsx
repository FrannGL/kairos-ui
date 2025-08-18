import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "@/components/Autocomplete/Input";

const defaultProps = {
  label: "Test",
  value: "",
  hasValue: false,
  open: false,
  onChange: vi.fn(),
  onClear: vi.fn(),
  onToggle: vi.fn(),
  onFocus: vi.fn(),
};

describe("Input", () => {
  it("maneja interacciones clave y muestra errores", () => {
    const handleChange = vi.fn();
    const handleFocus = vi.fn();
    const handleClear = vi.fn();
    const handleToggle = vi.fn();
    const handleKeyDown = vi.fn();

    render(
      <Input
        {...defaultProps}
        value="Algo"
        hasValue
        touched
        error="Error"
        onChange={handleChange}
        onFocus={handleFocus}
        onClear={handleClear}
        onToggle={handleToggle}
        onKeyDown={handleKeyDown}
      />
    );

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Hola" } });
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Escape" });

    fireEvent.click(screen.getByText("×")); // clear
    fireEvent.click(screen.getByAltText("arrow-icon")); // toggle

    expect(handleChange).toHaveBeenCalled();
    expect(handleFocus).toHaveBeenCalled();
    expect(handleKeyDown).toHaveBeenCalledTimes(2);
    expect(handleClear).toHaveBeenCalled();
    expect(handleToggle).toHaveBeenCalled();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
