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
      "0x669e3a48fa068514e89bc2be248be964d22672cc5e139034b0b39f0a9a174843516fd8e364a4b4ec09641a20166a17c6";
    const expectedMnemonic =
      "hawse those etoile paul magic female ornate clinic carl sam hanoi cakile item shield beat aerial rarely delta argue pence eric curb inform modern handy exulat tunis noise bonus accuse him left";

    expect(getMnemonicFromHexSeed(hexSeed)).toBe(expectedMnemonic);
  });
});
