import { SeedBinToMnemonic } from "@theqrl/wallet.js";
import { Buffer } from "buffer";

export const getMnemonicFromHexSeed = (hexSeed?: string) => {
  if (!hexSeed) return "";
  const trimmedHexSeed = hexSeed.trim();
  if (!trimmedHexSeed) return "";
  const hexSeedBin = Buffer.from(trimmedHexSeed.substring(2), "hex");
  return SeedBinToMnemonic(hexSeedBin);
};
