const groupWords = (mnemonic: string) => {
  const words = mnemonic
    .split(" ")
    .filter((word) => !!word)
    .map((word, index) => `${index + 1}. ${word}`);
  const groupedWords: string[][] = [];
  for (let i = 0; i < words.length; i += 3) {
    groupedWords.push(words.slice(i, i + 3));
  }
  return groupedWords;
};

type MnemonicWordListingProps = {
  mnemonic: string;
};

const MnemonicWordListing = ({ mnemonic = "" }: MnemonicWordListingProps) => {
  const trimmedMnemonic = mnemonic.trim();
  const words = groupWords(trimmedMnemonic);

  return (
    trimmedMnemonic && (
      <div className="space-y-2">
        <div className="font-bold">Mnemonic Phrases</div>
        <div className="flex flex-col gap-2 text-secondary">
          {words.map((groupedWords) => (
            <div
              key={groupedWords.toString()}
              className="grid grid-cols-3 gap-2"
            >
              {groupedWords.map((word) => (
                <div
                  key={word}
                  className="transition-transform hover:scale-110 hover:font-bold"
                >
                  {word}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default MnemonicWordListing;
