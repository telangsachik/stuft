import { useStore } from "@/stores/store";
import { Loader } from "lucide-react";
import { observer } from "mobx-react-lite";
import { BackgroundVideo } from "./BackgroundVideo/BackgroundVideo";
import { ConnectionBadge } from "./ConnectionBadge/ConnectionBadge";
import { CreateAccount } from "./CreateAccount/CreateAccount";

export const Home = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection } = zondStore;
  const { isLoading, isConnected } = zondConnection;

  return (
    <div className="relative text-foreground">
      <BackgroundVideo />
      <div className="absolute top-0 flex w-full flex-col items-center gap-4 pt-28">
        <img className="h-16 w-16" src="qrl-icon.png" />
        {isLoading ? (
          <Loader className="animate-spin text-foreground" size="32" />
        ) : (
          <>
            <ConnectionBadge />
            {isConnected && <CreateAccount />}
          </>
        )}
      </div>
    </div>
  );
});
