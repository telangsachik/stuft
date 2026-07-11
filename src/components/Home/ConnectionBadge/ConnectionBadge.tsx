import { Card } from "@/components/UI/card";
import { useStore } from "@/stores/store";
import { cva } from "class-variance-authority";
import { observer } from "mobx-react-lite";

const networkStatusClasses = cva("h-2 w-2 rounded-full", {
  variants: {
    networkStatus: {
      true: ["bg-constructive"],
      false: ["bg-destructive"],
    },
  },
  defaultVariants: {
    networkStatus: false,
  },
});

export const ConnectionBadge = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection, zondNetworkName } = zondStore;
  const { isConnected } = zondConnection;

  return (
    <Card className="flex items-center gap-2 rounded-full px-4 py-2">
      <Card
        className={networkStatusClasses({
          networkStatus: isConnected,
        })}
      />
      {zondNetworkName}
    </Card>
  );
});
