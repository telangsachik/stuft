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
import { Send } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const NativeToken = observer(() => {
  const { zondStore } = useStore();
  const { activeAccount, getAccountBalance } = zondStore;
  const { accountAddress } = activeAccount;

  return (
    <Card className="flex h-min w-full items-center justify-between gap-4 p-4 text-foreground hover:bg-accent">
      <div className="flex items-center gap-4">
        <img className="h-8 w-8" src="icons/qrl/default.png" />
        <div className="flex w-full flex-col">
          <div className="text-base font-bold">
            {getAccountBalance(accountAddress)}
          </div>
          <div className="text-xs">Quanta (native token)</div>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link to={ROUTES.ACCOUNT_DETAILS}>
              <Button
                className="hover:text-secondary"
                variant="outline"
                type="button"
                size="icon"
              >
                <Send size="18" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <Label>Send</Label>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Card>
  );
});

export default NativeToken;
