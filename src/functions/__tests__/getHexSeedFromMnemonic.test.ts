import { describe, expect, it } from "@jest/globals";
import { getHexSeedFromMnemonic } from "../getHexSeedFromMnemonic";

describe("getHexSeedFromMnemonic", () => {
  it("should return an empty string if the input mnemonic is empty", () => {
    const mnemonic = "";
    const expectedHexSeed = "";

    expect(getHexSeedFromMnemonic(mnemonic)).toBe(expectedHexSeed);
  });

  it("should return an empty string if the input mnemonic is undefined", () => {
    let mnemonic;
    const expectedHexSeed = "";

    expect(getHexSeedFromMnemonic(mnemonic)).toBe(expectedHexSeed);
  });

  it("should return an empty string if the input mnemonic has only empty spaces", () => {
    const mnemonic = "   ";
    const expectedHexSeed = "";

    expect(getHexSeedFromMnemonic(mnemonic)).toBe(expectedHexSeed);
  });

  it("should return a hexseed for the passed mnemonic phrases", () => {
    const mnemonic =
      "knight paddy action glow play chew lame mature sock ill deadly olive blink marble breach hey mile mature tacit mean polo crawl khaya stud number speed viking windy jump subtle mildew sewage";
    const expectedHexSeed =
      "0x7819dc0205e6a5c286796886ce16e637b99e1838701cc6988c5886ddc890a7f328771d9197fd17f36faa759d9b8c4c42";

    expect(getHexSeedFromMnemonic(mnemonic)).toBe(expectedHexSeed);
  });
});
