import { describe, expect, it } from "@jest/globals";
import { getHexSeedFromMnemonic } from "../getHexSeedFromMnemonic";

describe("getHexSeedFromMnemonic", () => {
  it("should return an empty string if the input mnemonic is empty", () => {
    const mnemonic = "";
    const expectedHexSeed = "";

    expect(getHexSeedFromMnemonic(mnemonic)).toBe(expectedHexSeed);
  });
});
