import { Button } from "@/components/UI/Button";
import { Card } from "@/components/UI/Card";
import { Label } from "@/components/UI/Label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { useStore } from "@/stores/store";
import { Copy } from "lucide-react";
import { observer } from "mobx-react-lite";

export const ActiveAccount = observer(() => {
  const { accountStore } = useStore();
  const { activeAccount } = accountStore;
  const { accountAddress } = activeAccount;

  const splitLength = 5;
  const prefix = accountAddress.substring(0, 2);
  const idSplit = [];
  for (let i = 2; i < accountAddress.length; i += splitLength) {
    idSplit.push(accountAddress.substring(i, i + splitLength));
  }

  const activeAccountLabel = `${accountAddress ? "Active account" : ""}`;

  const copyAccount = () => {
    navigator.clipboard.writeText(accountAddress);
  };

  return (
    !!accountAddress && (
      <>
        <Label className="text-secondary">{activeAccountLabel}</Label>
        <Card className="flex h-min gap-2 p-4 font-bold text-foreground hover:bg-accent">
          <div className="flex gap-2">
            <div>{prefix}</div>
            <div className="flex flex-wrap gap-1 font-bold">
              {idSplit.map((part) => (
                <div key={part}>{part}</div>
              ))}
            </div>
          </div>
          <span>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    className="hover:text-secondary"
                    variant="outline"
                    size="icon"
                    onClick={() => copyAccount()}
                  >
                    <Copy size="18" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <Label>Copy Address</Label>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </Card>
      </>
    )
  );
});
