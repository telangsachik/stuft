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
import { AccountId } from "../AccountId/AccountId";

export const OtherAccounts = observer(() => {
  const { zondStore } = useStore();
  const {
    zondAccounts,
    activeAccount: { accountAddress: activeAccountAddress },
    setActiveAccount,
  } = zondStore;
  const { accounts } = zondAccounts;

  const otherAccountsLabel = `${activeAccountAddress ? "Other accounts" : "Accounts"} in the wallet`;
  const otherAccounts = accounts.filter(
    ({ accountAddress }) => accountAddress !== activeAccountAddress,
  );

  return (
    !!otherAccounts.length && (
      <>
        <Label className="text-secondary">{otherAccountsLabel}</Label>
        {otherAccounts.map(({ accountAddress }) => (
          <Card
            id={accountAddress}
            className="flex gap-2 p-4 font-bold text-foreground hover:bg-accent"
          >
            <AccountId account={accountAddress} />
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
