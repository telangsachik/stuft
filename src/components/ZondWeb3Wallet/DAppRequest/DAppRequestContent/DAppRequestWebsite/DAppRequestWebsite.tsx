import { Card } from "@/components/UI/Card";
import { Separator } from "@/components/UI/Separator";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import DAppRequestFeature from "./DAppRequestFeature/DAppRequestFeature";

const DAppRequestWebsite = observer(() => {
  const { dAppRequestStore } = useStore();
  const { dAppRequestData } = dAppRequestStore;

  const parsedUrl = new URL(
    dAppRequestData?.requestData?.senderData?.url ?? "",
  );
  const urlOrigin = parsedUrl.origin;

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <img
          className="h-6 w-6"
          src={dAppRequestData?.requestData?.senderData?.favIconUrl}
          alt={dAppRequestData?.requestData?.senderData?.title}
        />
        <div className="flex flex-col">
          <span className="font-bold">{urlOrigin}</span>
          <span className="text-xm opacity-80">
            {dAppRequestData?.requestData?.senderData?.title}
          </span>
        </div>
      </div>
      <Separator />
      <DAppRequestFeature />
    </Card>
  );
});

export default DAppRequestWebsite;
