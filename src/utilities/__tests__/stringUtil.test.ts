import { describe, expect, it } from "@jest/globals";
import StringUtil from "../stringUtil";

describe("stringUtil", () => {
  it("should split the address with default split length of 4", () => {
    const accountAddress = "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1";
    const expectedSplitAddress =
      "0x 2090 E9F3 8771 876F B6Fc 51a6 b464 121d 3cC0 93A1";

    expect(StringUtil.getSplitAddress(accountAddress)).toBe(
      expectedSplitAddress,
    );
  });

  it("should split the address with the given length of 8", () => {
    const accountAddress = "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1";
    const expectedSplitAddress =
      "0x 2090E9F3 8771876F B6Fc51a6 b464121d 3cC093A1";

    expect(StringUtil.getSplitAddress(accountAddress, 8)).toBe(
      expectedSplitAddress,
    );
  });
});
