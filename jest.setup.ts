import { jest } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

Object.defineProperty(window, "matchMedia", {
  value: jest.fn().mockImplementation((query) => ({
    matches: true,
    query,
  })),
});

Object.defineProperty(window, "scrollTo", {
  value: jest.fn().mockImplementation((x, y) => ({ x, y })),
});
