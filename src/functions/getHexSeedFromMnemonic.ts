import { MnemonicToSeedBin } from "@theqrl/wallet.js";
import { Buffer } from "buffer";

export const getHexSeedFromMnemonic = (mnemonic?: string) => {
  if (!mnemonic) return "";
  const seedBin = MnemonicToSeedBin(mnemonic);
  return "0x".concat(Buffer.from(seedBin).toString("hex"));
};
