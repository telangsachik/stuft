import { SeedBinToMnemonic } from "@theqrl/wallet.js";
import { Buffer } from "buffer";

export const getMnemonicFromHexSeed = (hexSeed?: string) => {
  if (!hexSeed) return "";
  const hexSeedBin = Buffer.from(hexSeed.substring(2), "hex");
  return SeedBinToMnemonic(hexSeedBin);
};
