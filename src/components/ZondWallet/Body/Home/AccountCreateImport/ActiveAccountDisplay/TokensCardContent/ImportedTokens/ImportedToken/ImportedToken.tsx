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
import { getRandomTailwindTextColor } from "@/utilities/stylingUtil";
import { Box, Send } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type ImportedTokenProps = {
  contractAddress: string;
};

const ImportedToken = observer(({ contractAddress }: ImportedTokenProps) => {
  const { zondStore } = useStore();
  const { zondConnection, activeAccount, getTokenDetails } = zondStore;
  const { blockchain } = zondConnection;
  const { accountAddress } = activeAccount;

  const [token, setToken] =
    useState<Awaited<ReturnType<typeof getTokenDetails>>["token"]>();

  useEffect(() => {
    (async () => {
      const tokenDetails = await getTokenDetails(contractAddress);
      if (!tokenDetails.error) {
        setToken(tokenDetails.token);
      }
      console.log(">>> ", contractAddress, " > ", tokenDetails);
    })();
  }, [blockchain, accountAddress]);

  return (
    !!token && (
      <Card className="flex h-min w-full animate-appear-in items-center justify-between gap-4 p-4 text-foreground hover:bg-accent">
        <div className="flex items-center gap-4">
          <span className={getRandomTailwindTextColor()}>
            <Box size={32} />
          </span>
          <div className="flex w-full flex-col gap-1">
            <div className="text-base font-bold">
              {token.balance} {token.symbol}
            </div>
            <div className="text-xs">{token.name}</div>
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
              <Label>Send {token.symbol}</Label>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Card>
    )
  );
});

export default ImportedToken;
