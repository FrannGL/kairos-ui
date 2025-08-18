import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AutocompletePopup } from "@/components/Autocomplete/AutocompletePopup";

const options = [
  { alianzaCod: 1, alianzaDesc: "Opción 1" },
  { alianzaCod: 2, alianzaDesc: "Opción 2" },
  { alianzaCod: 3, alianzaDesc: "Opción 3" },
];

describe("AutocompletePopup", () => {
  it("renderiza opciones, selecciona y destaca la correcta", () => {
    const handleSelect = vi.fn();
    render(
      <AutocompletePopup
        options={options}
        value={options[1]}
        getOptionLabel={(o) => o.alianzaDesc}
        getOptionValue={(o) => o.alianzaCod}
        onSelect={handleSelect}
        highlightedIndex={2}
      />
    );

    options.forEach((opt, index) => {
      const optionEl = screen.getByTestId(`option-${index}`);
      expect(optionEl).toBeInTheDocument();
      expect(optionEl).toHaveTextContent(opt.alianzaDesc);

      if (opt === options[1]) {
        expect(optionEl).toHaveAttribute("data-selected", "true");
      } else {
        expect(optionEl).not.toHaveAttribute("data-selected");
      }

      if (index === 2) {
        expect(optionEl).toHaveAttribute("data-highlighted", "true");
      } else {
        expect(optionEl).not.toHaveAttribute("data-highlighted");
      }
    });

    fireEvent.click(screen.getByTestId("option-0"));
    expect(handleSelect).toHaveBeenCalledWith(options[0]);

    const list = screen.getByRole("listbox");
    expect(list.getAttribute("aria-activedescendant")).toBe("3");
  });
});
