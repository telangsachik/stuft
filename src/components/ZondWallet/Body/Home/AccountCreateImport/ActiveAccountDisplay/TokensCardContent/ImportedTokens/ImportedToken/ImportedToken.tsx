import { getOptimalTokenBalance } from "@/functions/getOptimalTokenBalance";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import TokenListItem from "../../TokenListItem/TokenListItem";

type ImportedTokenProps = {
  contractAddress: string;
};

const ImportedToken = observer(({ contractAddress }: ImportedTokenProps) => {
  const { zondStore } = useStore();
  const { zondConnection, activeAccount, getErc20TokenDetails } = zondStore;
  const { blockchain } = zondConnection;
  const { accountAddress } = activeAccount;

  const [token, setToken] =
    useState<Awaited<ReturnType<typeof getErc20TokenDetails>>["token"]>();

  useEffect(() => {
    (async () => {
      const tokenDetails = await getErc20TokenDetails(contractAddress);
      if (!tokenDetails.error) {
        setToken(tokenDetails.token);
      }
    })();
  }, [blockchain, accountAddress]);

  return (
    !!token && (
      <TokenListItem
        balance={getOptimalTokenBalance(token.balance.toString(), token.symbol)}
        name={token.name}
        symbol={token.symbol}
      />
    )
  );
});

export default ImportedToken;
