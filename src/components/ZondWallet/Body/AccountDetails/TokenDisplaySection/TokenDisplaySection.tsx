import { Separator } from "@/components/UI/Separator";

const TokenDisplaySection = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-6">
        <img className="h-16 w-16" src="icons/qrl/default.png" />
        <div className="flex flex-col">
          <div className="text-2xl font-bold">QRL</div>
          <div className="text-lg">Quanta</div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default TokenDisplaySection;
