import { WORD_LIST } from "@/constants/wordList";

export const mnemonicToHexSeed = (mnemonic: string) => {
  const mnemonicWords = mnemonic.split(" ");
  const wordCount = mnemonicWords.length;
  if (wordCount % 2 !== 0) {
    throw new Error("word count must be even");
  }

  const wordLookup: { [x: string]: number } = {};
  WORD_LIST.map((word, i) => {
    wordLookup[word] = i;
    return word;
  });

  const result = new Uint8Array((wordCount * 15) / 10);

  let current = 0;
  let buffering = 0;
  let resultIndex = 0;

  mnemonicWords.map((w) => {
    const value = wordLookup[w];
    if (value === undefined || value === null) {
      throw new Error("invalid word in mnemonic");
    }
    buffering += 3;
    current = (current << 12) + value;
    let shift;
    let mask;
    let tmp;
    for (; buffering > 2; ) {
      shift = 4 * (buffering - 2);
      mask = (1 << shift) - 1;
      tmp = current >> shift;
      buffering -= 2;
      current &= mask;
      result[resultIndex] = tmp;
      resultIndex++;
    }
    return w;
  });

  if (buffering > 0) {
    result[resultIndex] = current & 0xff;
    resultIndex++;
  }
  return new TextDecoder().decode(result).replace(/\W/g, "");
};
