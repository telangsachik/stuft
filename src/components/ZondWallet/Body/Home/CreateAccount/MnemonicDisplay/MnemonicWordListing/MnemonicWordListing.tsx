import { Card } from "@/components/UI/Card";

const groupWords = (mnemonic: string) => {
  const words = mnemonic
    .split(" ")
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

export const MnemonicWordListing = ({ mnemonic }: MnemonicWordListingProps) => {
  const words = groupWords(mnemonic);

  return (
    <div className="flex flex-col gap-2">
      {words.map((groupedWords) => (
        <div className="grid grid-cols-3 gap-2">
          {groupedWords.map((word) => (
            <Card className="p-2">{word}</Card>
          ))}
        </div>
      ))}
    </div>
  );
};
