import { WORD_LIST } from "@/constants/wordList";

export const hexSeedToMnemonic = (hexSeed: string) => {
  const hexSeedUIntArray = new TextEncoder().encode(hexSeed.replace(/\W/g, ""));
  const mnemonic = [];
  for (let nibble = 0; nibble < hexSeedUIntArray.length * 2; nibble += 3) {
    const p = nibble >> 1;
    const b1 = hexSeedUIntArray[p];
    let b2 = 0;
    if (p + 1 < hexSeedUIntArray.length) {
      b2 = hexSeedUIntArray[p + 1];
    }
    let idx = 0;
    if (nibble % 2 === 0) {
      idx = (b1 << 4) + (b2 >> 4);
    } else {
      idx = ((b1 & 0x0f) << 8) + b2;
    }
    mnemonic.push(WORD_LIST[idx]);
  }
  return mnemonic.join(" ");
};
