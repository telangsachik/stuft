import { describe, expect, it } from "@jest/globals";
import { getOptimalTokenBalance } from "../getOptimalTokenBalance";

describe("getOptimalTokenBalance", () => {
  it("should return the balance 0.0 if the balance is an empty string", () => {
    const balance = "";
    const tokenBalance = "0.0 QRL";

    expect(getOptimalTokenBalance(balance)).toBe(tokenBalance);
  });

  it("should return the balance 1787372.5556 if the balance is 1787372.5556", () => {
    const balance = "1787372.5556";
    const tokenBalance = "1787372.5556 QRL";

    expect(getOptimalTokenBalance(balance)).toBe(tokenBalance);
  });

  it("should return the balance 0.0 if the balance is 0.0000000", () => {
    const balance = "0.0000000";
    const tokenBalance = "0.0 QRL";

    expect(getOptimalTokenBalance(balance)).toBe(tokenBalance);
  });

  it("should return the balance 1.007 if the balance is 1.007025000", () => {
    const balance = "1.007025000";
    const tokenBalance = "1.007 QRL";

    expect(getOptimalTokenBalance(balance)).toBe(tokenBalance);
  });

  it("should return the balance 0.0 if the balance is 0. ", () => {
    const balance = "0.";
    const tokenBalance = "0.0 QRL";

    expect(getOptimalTokenBalance(balance)).toBe(tokenBalance);
  });

  it("should return the balance 7.0 if the balance is 7", () => {
    const balance = "7";
    const tokenBalance = "7.0 QRL";

    expect(getOptimalTokenBalance(balance)).toBe(tokenBalance);
  });

  it("should return the balance 8.0 with the passed token symbol if the balance is 8", () => {
    const balance = "8";
    const tokenBalance = "8.0 XYZ";

    expect(getOptimalTokenBalance(balance, "XYZ")).toBe(tokenBalance);
  });
});
