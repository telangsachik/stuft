import { Card } from "@/components/UI/Card";
import { Separator } from "@/components/UI/Separator";
import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import DAppRequestFeature from "./DAppRequestFeature/DAppRequestFeature";

type DAppRequestWebsiteProps = {
  dAppRequestData: DAppRequestType;
  addToResponseData: (data: any) => void;
  decideCanProceed: (decision: boolean) => void;
};

const DAppRequestWebsite = ({
  dAppRequestData,
  addToResponseData,
  decideCanProceed,
}: DAppRequestWebsiteProps) => {
  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <img
          className="h-8 w-8"
          src={dAppRequestData?.requestData?.senderData?.favIconUrl}
          alt={dAppRequestData?.requestData?.senderData?.title}
        />
        <div className="flex flex-col gap-1">
          <span className="font-bold">
            {dAppRequestData?.requestData?.senderData?.url}
          </span>
          <span className="text-xm opacity-80">
            {dAppRequestData?.requestData?.senderData?.title}
          </span>
        </div>
      </div>
      <Separator />
      <DAppRequestFeature
        dAppRequestData={dAppRequestData}
        addToResponseData={addToResponseData}
        decideCanProceed={decideCanProceed}
      />
    </Card>
  );
};

export default DAppRequestWebsite;
