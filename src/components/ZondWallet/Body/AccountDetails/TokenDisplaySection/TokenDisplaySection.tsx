import { Separator } from "@/components/UI/Separator";
import { getRandomTailwindTextColor } from "@/utilities/stylingUtil";
import { TextSelect } from "lucide-react";

type TokenDisplaySectionProps = {
  tokenIcon: string;
  tokenSymbol: string;
  tokenName: string;
};

const TokenDisplaySection = ({
  tokenIcon,
  tokenSymbol,
  tokenName,
}: TokenDisplaySectionProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-6">
        {!!tokenIcon ? (
          <img className="h-16 w-16" src={tokenIcon} />
        ) : (
          <span className={getRandomTailwindTextColor(tokenSymbol)}>
            <TextSelect size={64} />
          </span>
        )}
        <div className="flex flex-col">
          <div className="text-2xl font-bold">{tokenSymbol}</div>
          <div className="text-lg">{tokenName}</div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default TokenDisplaySection;
