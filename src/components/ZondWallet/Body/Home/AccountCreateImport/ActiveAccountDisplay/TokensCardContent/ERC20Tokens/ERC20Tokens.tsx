import { Button } from "@/components/UI/Button";
import { ROUTES } from "@/router/router";
import { useStore } from "@/stores/store";
import StorageUtil from "@/utilities/storageUtil";
import { ChevronsRight } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ERC20Token from "./ERC20Token/ERC20Token";

type ERC20TokensProps = {
  shouldDisplayAllTokens?: boolean;
};

const ERC20Tokens = observer(
  ({ shouldDisplayAllTokens = false }: ERC20TokensProps) => {
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
            <ERC20Token
              key={contractAddress}
              contractAddress={contractAddress}
            />
          ))}
        {shouldDisplayViewAllButton && (
          <Link className="w-full" to={ROUTES.ALL_ERC_20_TOKENS}>
            <Button className="w-full" type="button" variant="ghost">
              <ChevronsRight className="mr-2 h-4 w-4" />
              View all ERC 20 tokens
            </Button>
          </Link>
        )}
      </>
    );
  },
);

export default ERC20Tokens;
