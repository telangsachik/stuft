import { describe, expect, it } from "@jest/globals";
import { getOptimalGasFee } from "../getOptimalGasFee";

describe("getOptimalGasFee", () => {
  it("should return the gas fee 0.0 if the gas is an empty string", () => {
    const gas = "";
    const zndGas = "0.0 ZND";

    expect(getOptimalGasFee(gas)).toBe(zndGas);
  });

  it("should return the gas fee 0.0 if the gas is 0.0", () => {
    const gas = "0.0";
    const zndGas = "0.0 ZND";

    expect(getOptimalGasFee(gas)).toBe(zndGas);
  });

  it("should return the gas fee 0.0 if the gas is 0.", () => {
    const gas = "0.";
    const zndGas = "0.0 ZND";

    expect(getOptimalGasFee(gas)).toBe(zndGas);
  });

  it("should return the gas fee 0.0 if the gas is 0", () => {
    const gas = "0";
    const zndGas = "0.0 ZND";

    expect(getOptimalGasFee(gas)).toBe(zndGas);
  });

  it("should return the gas fee 0.00002255 if the gas is 0.000022554450", () => {
    const gas = "0.000022554450";
    const zndGas = "0.00002255 ZND";

    expect(getOptimalGasFee(gas)).toBe(zndGas);
  });

  it("should return the gas fee 0.007777 if the gas is 0.007777777", () => {
    const gas = "0.007777777";
    const zndGas = "0.007777 ZND";

    expect(getOptimalGasFee(gas)).toBe(zndGas);
  });

  it("should return the gas fee 0.000021 if the gas is 0.000021000000147", () => {
    const gas = "0.000021000000147";
    const zndGas = "0.000021 ZND";

    expect(getOptimalGasFee(gas)).toBe(zndGas);
  });

  it("should return the gas fee 0.000076 with passed token symbol if the gas is 0.0000760000002", () => {
    const gas = "0.0000760000002";
    const zndGas = "0.000076 PQR";

    expect(getOptimalGasFee(gas, "PQR")).toBe(zndGas);
  });
});
