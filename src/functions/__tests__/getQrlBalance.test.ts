import { describe, expect, it } from "@jest/globals";
import { getQrlBalance } from "../getQrlBalance";

describe("getQrlBalance", () => {
  it("should return the balance 0 if the balance is an empty string", () => {
    const balance = "";
    const qrlBalance = "0.0 QRL";

    expect(getQrlBalance(balance)).toBe(qrlBalance);
  });

  it("should return the balance 1787372.5556 if the balance is 1787372.5556 string", () => {
    const balance = "1787372.5556";
    const qrlBalance = "1787372.5556 QRL";

    expect(getQrlBalance(balance)).toBe(qrlBalance);
  });

  it("should return the balance 0.0 if the balance is 0.0000000 string", () => {
    const balance = "0.0000000";
    const qrlBalance = "0.0 QRL";

    expect(getQrlBalance(balance)).toBe(qrlBalance);
  });

  it("should return the balance 1.007 if the balance is 1.007025000 string", () => {
    const balance = "1.007025000";
    const qrlBalance = "1.007 QRL";

    expect(getQrlBalance(balance)).toBe(qrlBalance);
  });

  it("should return the balance 0.0 if the balance is 0. string", () => {
    const balance = "0.";
    const qrlBalance = "0.0 QRL";

    expect(getQrlBalance(balance)).toBe(qrlBalance);
  });

  it("should return the balance 7.0 if the balance is 7 string", () => {
    const balance = "7";
    const qrlBalance = "7.0 QRL";

    expect(getQrlBalance(balance)).toBe(qrlBalance);
  });
});
