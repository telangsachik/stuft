import { Card } from "@/components/ui/card";
import { useZondNetwork } from "@hooks/useNetwork";
import { cva } from "class-variance-authority";

const networkStatusClasses = cva("h-2 w-2 rounded-full", {
  variants: {
    networkStatus: {
      true: ["bg-primary"],
      false: ["bg-destructive"],
    },
  },
  defaultVariants: {
    networkStatus: false,
  },
});

export const ConnectionBadge = () => {
  const { hasZondConnection } = useZondNetwork();

  return (
    <Card className="flex items-center gap-2 rounded-full px-4 py-2">
      <Card
        className={networkStatusClasses({
          networkStatus: !hasZondConnection,
        })}
      />
      Zond Mainnet
    </Card>
  );
};
