import { RESTRICTED_METHODS } from "@/scripts/constants/requestConstants";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import ZondRequestAccount from "./ZondRequestAccount/ZondRequestAccount";
import ZondSendTransaction from "./ZondSendTransaction/ZondSendTransaction";

const DAppRequestFeature = observer(() => {
  const { dAppRequestStore } = useStore();
  const { dAppRequestData } = dAppRequestStore;

  switch (dAppRequestData?.method) {
    case RESTRICTED_METHODS.ZOND_REQUEST_ACCOUNTS:
      return <ZondRequestAccount />;
    case RESTRICTED_METHODS.ZOND_SEND_TRANSACTION:
      return <ZondSendTransaction />;
    default:
      return <></>;
  }
});

export default DAppRequestFeature;
