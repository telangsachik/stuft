import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  injectGlobals: false,
  moduleNameMapper: {
    "^@/stores/store": "<rootDir>/src/__mocks__/mockedStore.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^webextension-polyfill$":
      "<rootDir>/src/__mocks__/mockedWebExtensionPolyfill.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
