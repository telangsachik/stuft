import RouteMonitor from "@/components/ZondWeb3Wallet/RouteMonitor/RouteMonitor";
import withSuspense from "@/functions/withSuspense";
import StorageUtil from "@/utilities/storageUtil";
import { observer } from "mobx-react-lite";
import { lazy, useEffect, useState } from "react";
import DAppRequest from "./DAppRequest/DAppRequest";

const Header = withSuspense(
  lazy(() => import("@/components/ZondWeb3Wallet/Header/Header")),
);
const Body = withSuspense(
  lazy(() => import("@/components/ZondWeb3Wallet/Body/Body")),
);

const ZondWallet = observer(() => {
  const [hasDAppRequest, setHasDAppRequest] = useState(true);

  useEffect(() => {
    (async () => {
      const storedDAppRequestData = await StorageUtil.getDAppRequestData();
      setHasDAppRequest(!!storedDAppRequestData);
    })();
  }, []);

  return (
    <div className="flex min-h-[48rem] w-[26rem] flex-col overflow-x-hidden bg-background text-foreground">
      <RouteMonitor />
      {hasDAppRequest ? (
        <DAppRequest />
      ) : (
        <>
          <Header />
          <Body />
        </>
      )}
    </div>
  );
});

export default ZondWallet;
