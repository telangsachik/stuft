import { REQUEST_METHODS } from "@/scripts/constants/requestConstants";
import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import EthRequestAccount from "./EthRequestAccount/EthRequestAccount";

type DAppRequestFeatureProps = {
  dAppRequestData: DAppRequestType;
  addToResponseData: (data: any) => void;
  decideCanProceed: (decision: boolean) => void;
};

const DAppRequestFeature = ({
  dAppRequestData,
  addToResponseData,
  decideCanProceed,
}: DAppRequestFeatureProps) => {
  addToResponseData({});

  switch (dAppRequestData?.method) {
    case REQUEST_METHODS.ETH_REQUEST_ACCOUNT:
      return (
        <EthRequestAccount
          addToResponseData={addToResponseData}
          decideCanProceed={decideCanProceed}
        />
      );
    default:
      return <></>;
  }
};

export default DAppRequestFeature;
