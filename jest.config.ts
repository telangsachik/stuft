import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^webextension-polyfill$": "<rootDir>/src/__mocks__/browser.ts",
  },
  setupFiles: ["./jest.setup.ts"],
};

export default config;
