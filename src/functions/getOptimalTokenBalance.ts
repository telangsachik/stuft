import { NATIVE_TOKEN } from "@/constants/nativeToken";
import { BigNumber } from "bignumber.js";

BigNumber.config({
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: 1e9,
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  FORMAT: {
    decimalSeparator: ".",
    groupSeparator: ",",
    groupSize: 3,
  },
});

export const getOptimalTokenBalance = (
  balance: string,
  tokenSymbol?: string,
) => {
  const symbol = tokenSymbol ?? NATIVE_TOKEN.symbol;
  try {
    const bigNumber = new BigNumber(balance);
    if (bigNumber.isNaN() || bigNumber.isZero()) return `0.0 ${symbol}`;

    let formatted = bigNumber
      .toFormat(4, BigNumber.ROUND_DOWN)
      .replace(/\.?0+$/, "");

    if (!formatted.includes(".")) {
      formatted += ".0";
    }

    return `${formatted} ${symbol}`;
  } catch {
    return `0.0 ${symbol}`;
  }
};
