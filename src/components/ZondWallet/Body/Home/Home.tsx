import { useStore } from "@/stores/store";
import { Loader } from "lucide-react";
import { observer } from "mobx-react-lite";
import { AccountCreateImport } from "./AccountCreateImport/AccountCreateImport";
import { BackgroundVideo } from "./BackgroundVideo/BackgroundVideo";
import { ConnectionBadge } from "./ConnectionBadge/ConnectionBadge";

export const Home = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection } = zondStore;
  const { isLoading, isConnected } = zondConnection;

  return (
    <>
      <BackgroundVideo />
      <div className="relative z-10 flex w-full flex-col items-center gap-4 p-8">
        <img className="h-16 w-16" src="qrl-icon.png" />
        {isLoading ? (
          <Loader className="animate-spin text-foreground" size="32" />
        ) : (
          <>
            <ConnectionBadge />
            {isConnected && <AccountCreateImport />}
          </>
        )}
      </div>
    </>
  );
});
