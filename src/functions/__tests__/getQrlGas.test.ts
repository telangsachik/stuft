import { describe, expect, it } from "@jest/globals";
import { getQrlGas } from "../getQrlGas";

describe("getGasAmount", () => {
  it("should return the gas fee 0.0 if the gas is an empty string", () => {
    const gas = "";
    const qrlGas = "0.0 QRL";

    expect(getQrlGas(gas)).toBe(qrlGas);
  });

  it("should return the gas fee 0.0 if the gas is 0.0", () => {
    const gas = "0.0";
    const qrlGas = "0.0 QRL";

    expect(getQrlGas(gas)).toBe(qrlGas);
  });

  it("should return the gas fee 0.00002 if the gas is 0.000022554450", () => {
    const gas = "0.000022554450";
    const qrlGas = "0.00002 QRL";

    expect(getQrlGas(gas)).toBe(qrlGas);
  });

  it("should return the gas fee 0.007 if the gas is 0.007777777", () => {
    const gas = "0.007777777";
    const qrlGas = "0.007 QRL";

    expect(getQrlGas(gas)).toBe(qrlGas);
  });
});
