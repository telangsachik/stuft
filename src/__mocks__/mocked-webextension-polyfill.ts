import { jest } from "@jest/globals";

const mockedBrowser = {
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    },
  },
};

export default mockedBrowser;
