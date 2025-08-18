import "@testing-library/jest-dom";
import { vi, beforeEach } from "vitest";

// Mock de scrollIntoView
beforeEach(() => {
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

// Mock global de fetch
global.fetch = vi.fn();

// Resetear todos los mocks antes de cada test
beforeEach(() => {
  vi.resetAllMocks();
});
