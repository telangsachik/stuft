import { describe, expect, it } from "@jest/globals";
import { getOptimalGasFee } from "../getOptimalGasFee";

describe("getOptimalGasFee", () => {
  it("should return the gas fee 0.0 if the gas is an empty string", () => {
    const gas = "";
    const qrlGas = "0.0 QRL";

    expect(getOptimalGasFee(gas)).toBe(qrlGas);
  });

  it("should return the gas fee 0.0 if the gas is 0.0", () => {
    const gas = "0.0";
    const qrlGas = "0.0 QRL";

    expect(getOptimalGasFee(gas)).toBe(qrlGas);
  });

  it("should return the gas fee 0.0 if the gas is 0.", () => {
    const gas = "0.";
    const qrlGas = "0.0 QRL";

    expect(getOptimalGasFee(gas)).toBe(qrlGas);
  });

  it("should return the gas fee 0.0 if the gas is 0", () => {
    const gas = "0";
    const qrlGas = "0.0 QRL";

    expect(getOptimalGasFee(gas)).toBe(qrlGas);
  });

  it("should return the gas fee 0.00002255 if the gas is 0.000022554450", () => {
    const gas = "0.000022554450";
    const qrlGas = "0.00002255 QRL";

    expect(getOptimalGasFee(gas)).toBe(qrlGas);
  });

  it("should return the gas fee 0.007777 if the gas is 0.007777777", () => {
    const gas = "0.007777777";
    const qrlGas = "0.007777 QRL";

    expect(getOptimalGasFee(gas)).toBe(qrlGas);
  });

  it("should return the gas fee 0.000021 if the gas is 0.000021000000147", () => {
    const gas = "0.000021000000147";
    const qrlGas = "0.000021 QRL";

    expect(getOptimalGasFee(gas)).toBe(qrlGas);
  });

  it("should return the gas fee 0.000076 with passed token symbol if the gas is 0.0000760000002", () => {
    const gas = "0.0000760000002";
    const qrlGas = "0.000076 PQR";

    expect(getOptimalGasFee(gas, "PQR")).toBe(qrlGas);
  });
});
