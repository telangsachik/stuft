import StringUtil from "@/utilities/stringUtil";

type HexSeedListingProps = {
  hexSeed?: string;
};

const HexSeedListing = ({ hexSeed = "" }: HexSeedListingProps) => {
  const { prefix, addressSplit } = StringUtil.getSplitAddress(hexSeed, 3);

  return (
    <div className="space-y-2">
      <div className="font-bold">Hex Seed</div>
      <div className="flex flex-wrap gap-1 text-secondary">
        {prefix}
        {addressSplit.map((segment) => (
          <span
            key={segment}
            className="transition-transform hover:scale-110 hover:font-bold"
          >
            {segment}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HexSeedListing;
