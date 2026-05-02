import { Label } from "@/components/ui/label";
import { useStore } from "@/stores/store";
import { Loader } from "lucide-react";
import { observer } from "mobx-react-lite";

export const NoConnection = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection, zondNetworkName } = zondStore;
  const { isLoading, isConnected } = zondConnection;

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 bg-background p-4">
      <img className="h-16 w-16" src="icon.png" />
      {isLoading ? (
        <Loader className="animate-spin text-foreground" size="32" />
      ) : (
        <Label>
          You are {isConnected ? "" : "not"} connected to the {zondNetworkName}{" "}
          blockchain
        </Label>
      )}
    </div>
  );
});
