import { describe, expect, it } from "@jest/globals";
import StringUtil from "../stringUtil";

describe("stringUtil", () => {
  it("should split the address with default split length of 5", () => {
    const accountAddress = "Z2090E9F38771876FB6Fc51a6b464121d3cC093A1";
    const expectedSplitAddress =
      "2090E 9F387 71876 FB6Fc 51a6b 46412 1d3cC 093A1";
    const { prefix, addressSplit } = StringUtil.getSplitAddress(accountAddress);

    expect(prefix).toBe("Z");
    expect(addressSplit.join(" ")).toBe(expectedSplitAddress);
  });

  it("should split the address with the given length of 8", () => {
    const accountAddress = "Z2090E9F38771876FB6Fc51a6b464121d3cC093A1";
    const expectedSplitAddress = "2090E9F3 8771876F B6Fc51a6 b464121d 3cC093A1";
    const { prefix, addressSplit } = StringUtil.getSplitAddress(
      accountAddress,
      8,
    );

    expect(prefix).toBe("Z");
    expect(addressSplit.join(" ")).toBe(expectedSplitAddress);
  });

  it("should split the address to array of strings", () => {
    const address = "Z20D20b8026B8F02540246f58120ddAAf35AECD9B";
    const expectedPrefix = "Z";
    const expectedAddressSplit = [
      "20D20",
      "b8026",
      "B8F02",
      "54024",
      "6f581",
      "20ddA",
      "Af35A",
      "ECD9B",
    ];
    expect(StringUtil.getSplitAddress(address).prefix).toEqual(expectedPrefix);
    expect(StringUtil.getSplitAddress(address).addressSplit).toEqual(
      expectedAddressSplit,
    );
  });
});
