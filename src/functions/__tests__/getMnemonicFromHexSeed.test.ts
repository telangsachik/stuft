import { describe, expect, it } from "@jest/globals";
import { getMnemonicFromHexSeed } from "../getMnemonicFromHexSeed";

describe("getMnemonicFromHexSeed", () => {
  it("should return an empty string if the input hexseed is empty", () => {
    const hexSeed = "";
    const expectedMnemonic = "";

    expect(getMnemonicFromHexSeed(hexSeed)).toBe(expectedMnemonic);
  });

  it("should return an empty string if the input hexseed is undefined", () => {
    let hexSeed;
    const expectedMnemonic = "";

    expect(getMnemonicFromHexSeed(hexSeed)).toBe(expectedMnemonic);
  });

  it("should return an empty string if the input hexseed has only empty spaces", () => {
    const hexSeed = "     ";
    const expectedMnemonic = "";

    expect(getMnemonicFromHexSeed(hexSeed)).toBe(expectedMnemonic);
  });

  it("should return mnemonic phrases for the passed hexseed", () => {
    const hexSeed =
      "0x7819dc0205e6a5c286796886ce16e637b99e1838701cc6988c5886ddc890a7f328771d9197fd17f36faa759d9b8c4c42";
    const expectedMnemonic =
      "knight paddy action glow play chew lame mature sock ill deadly olive blink marble breach hey mile mature tacit mean polo crawl khaya stud number speed viking windy jump subtle mildew sewage";

    expect(getMnemonicFromHexSeed(hexSeed)).toBe(expectedMnemonic);
  });
});
