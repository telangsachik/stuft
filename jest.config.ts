import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  injectGlobals: false,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^webextension-polyfill$":
      "<rootDir>/src/__mocks__/mocked-webextension-polyfill.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
