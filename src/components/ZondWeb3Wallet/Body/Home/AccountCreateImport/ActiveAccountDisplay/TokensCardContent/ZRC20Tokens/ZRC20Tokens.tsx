import { Button } from "@/components/UI/Button";
import { ROUTES } from "@/router/router";
import { useStore } from "@/stores/store";
import StorageUtil from "@/utilities/storageUtil";
import { ChevronsRight } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ZRC20Token from "./ZRC20Token/ZRC20Token";

type ZRC20TokensProps = {
  shouldDisplayAllTokens?: boolean;
};

const ZRC20Tokens = observer(
  ({ shouldDisplayAllTokens = false }: ZRC20TokensProps) => {
    const { zondStore } = useStore();
    const { activeAccount, zondConnection } = zondStore;
    const { accountAddress } = activeAccount;
    const { blockchain } = zondConnection;

    const [tokenContractsList, setTokenContractsList] = useState<string[]>([]);

    const numberOfTokens = tokenContractsList.length;
    const tokenDisplayLimit = 2;
    const shouldDisplayViewAllButton =
      !!numberOfTokens &&
      numberOfTokens > tokenDisplayLimit &&
      !shouldDisplayAllTokens;

    useEffect(() => {
      (async () => {
        const storedTokens = await StorageUtil.getTokenContractsList(
          blockchain,
          accountAddress,
        );
        setTokenContractsList(storedTokens);
      })();
    }, [blockchain, accountAddress]);

    return (
      <>
        {tokenContractsList
          .slice(
            0,
            shouldDisplayAllTokens ? numberOfTokens + 1 : tokenDisplayLimit,
          )
          .map((contractAddress) => (
            <ZRC20Token
              key={contractAddress}
              contractAddress={contractAddress}
            />
          ))}
        {shouldDisplayViewAllButton && (
          <Link className="w-full" to={ROUTES.ALL_ZRC_20_TOKENS}>
            <Button className="w-full" type="button" variant="ghost">
              <ChevronsRight className="mr-2 h-4 w-4" />
              View all ZRC 20 tokens
            </Button>
          </Link>
        )}
      </>
    );
  },
);

export default ZRC20Tokens;
