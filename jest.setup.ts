import { jest } from "@jest/globals";

Object.defineProperty(window, "matchMedia", {
  value: jest.fn().mockImplementation((query) => ({
    matches: true,
  })),
});

Object.defineProperty(window, "scrollTo", {
  value: jest.fn().mockImplementation((x, y) => ({})),
});
