import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["<rootDir>/src/components/UI/"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  injectGlobals: false,
  moduleNameMapper: {
    "^@/stores/store": "<rootDir>/src/__mocks__/mockedStore.ts",
    "^webextension-polyfill$":
      "<rootDir>/src/__mocks__/mockedWebExtensionPolyfill.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
