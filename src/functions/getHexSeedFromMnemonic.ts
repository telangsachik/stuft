import { MnemonicToSeedBin } from "@theqrl/wallet.js";
import { Buffer } from "buffer";

export const getHexSeedFromMnemonic = (mnemonic?: string) => {
  if (!mnemonic) return "";
  const trimmedMnemonic = mnemonic.trim();
  if (!trimmedMnemonic) return "";
  const seedBin = MnemonicToSeedBin(trimmedMnemonic);
  return "0x".concat(Buffer.from(seedBin).toString("hex"));
};
