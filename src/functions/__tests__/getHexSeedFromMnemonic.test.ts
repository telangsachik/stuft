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
      "hawse those etoile paul magic female ornate clinic carl sam hanoi cakile item shield beat aerial rarely delta argue pence eric curb inform modern handy exulat tunis noise bonus accuse him left";
    const expectedHexSeed =
      "0x669e3a48fa068514e89bc2be248be964d22672cc5e139034b0b39f0a9a174843516fd8e364a4b4ec09641a20166a17c6";

    expect(getHexSeedFromMnemonic(mnemonic)).toBe(expectedHexSeed);
  });
});
