import { Button } from "@/components/UI/Button";
import { Card } from "@/components/UI/Card";
import { Label } from "@/components/UI/Label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { ROUTES } from "@/router/router";
import { useStore } from "@/stores/store";
import { Copy, Send } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import AccountId from "../AccountId/AccountId";

export const ActiveAccount = observer(() => {
  const { zondStore } = useStore();
  const {
    activeAccount: { accountAddress },
  } = zondStore;

  const activeAccountLabel = `${accountAddress ? "Active account" : ""}`;

  const copyAccount = () => {
    navigator.clipboard.writeText(accountAddress);
  };

  return (
    !!accountAddress && (
      <>
        <Label className="text-secondary">{activeAccountLabel}</Label>
        <Card className="flex w-full flex-col gap-4 p-4 font-bold text-foreground hover:bg-accent">
          <div className="flex gap-2">
            <AccountId account={accountAddress} />
            <span>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      className="hover:text-secondary"
                      variant="outline"
                      size="icon"
                      onClick={copyAccount}
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
          </div>
          <Link className="w-full" to={ROUTES.ACCOUNT_DETAILS}>
            <Button variant="outline" className="w-full hover:text-secondary">
              <Send className="mr-2 h-4 w-4" />
              Send Quanta
            </Button>
          </Link>
        </Card>
      </>
    )
  );
});
