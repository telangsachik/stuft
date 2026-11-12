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
import { ArrowRight } from "lucide-react";
import { observer } from "mobx-react-lite";

export const OtherAccounts = observer(() => {
  const { accountStore, zondStore } = useStore();
  const { activeAccount, setActiveAccount } = accountStore;
  const { accountAddress: activeAccountAddress } = activeAccount;
  const { zondAccounts } = zondStore;
  const { accounts } = zondAccounts;

  const splitLength = 5;
  const prefix = activeAccountAddress.substring(0, 2);
  const idSplit: string[] = [];
  for (let i = 2; i < activeAccountAddress.length; i += splitLength) {
    idSplit.push(activeAccountAddress.substring(i, i + splitLength));
  }

  const otherAccountsLabel = `${activeAccountAddress ? "Other accounts" : "Accounts"} in the wallet`;
  const otherAccounts = accounts.filter(
    ({ accountAddress }) => accountAddress !== activeAccountAddress,
  );

  return (
    !!otherAccounts.length && (
      <>
        <Label className="text-secondary">{otherAccountsLabel}</Label>
        {otherAccounts.map(({ accountAddress }) => (
          <Card className="flex h-min gap-2 p-4 font-bold text-foreground hover:bg-accent">
            <div className="flex gap-2">
              <div>{prefix}</div>
              <div className="flex flex-wrap gap-1">
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
                      onClick={() => setActiveAccount(accountAddress)}
                    >
                      <ArrowRight size="18" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <Label>Switch to this account</Label>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </Card>
        ))}
      </>
    )
  );
});
