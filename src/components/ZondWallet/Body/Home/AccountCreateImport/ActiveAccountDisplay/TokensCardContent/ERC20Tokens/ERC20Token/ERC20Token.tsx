import { getOptimalTokenBalance } from "@/functions/getOptimalTokenBalance";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import TokenListItem from "../../TokenListItem/TokenListItem";
import TokenListItemLoading from "../../TokenListItemLoading/TokenListItemLoading";

type ERC20TokenProps = {
  contractAddress: string;
};

const ERC20Token = observer(({ contractAddress }: ERC20TokenProps) => {
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

  return !token ? (
    <TokenListItemLoading />
  ) : (
    <TokenListItem
      isErc20Token={true}
      contractAddress={contractAddress}
      decimals={Number(token.decimals)}
      balance={getOptimalTokenBalance(token.balance.toString(), token.symbol)}
      name={token.name}
      symbol={token.symbol}
    />
  );
});

export default ERC20Token;
