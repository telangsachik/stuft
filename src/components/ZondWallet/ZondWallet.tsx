import RouteMonitor from "@/components/ZondWallet/RouteMonitor/RouteMonitor";
import withSuspense from "@/functions/withSuspense";
import { observer } from "mobx-react-lite";
import { lazy } from "react";

const Header = withSuspense(
  lazy(() => import("@/components/ZondWallet/Header/Header")),
);
const Body = withSuspense(
  lazy(() => import("@/components/ZondWallet/Body/Body")),
);

const ZondWallet = observer(() => {
  return (
    <div className="flex min-h-[48rem] w-[26rem] flex-col overflow-x-hidden bg-background text-foreground">
      <RouteMonitor />
      <Header />
      <Body />
    </div>
  );
});

export default ZondWallet;
