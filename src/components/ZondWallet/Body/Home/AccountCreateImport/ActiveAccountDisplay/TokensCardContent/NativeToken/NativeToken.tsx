import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import TokenListItem from "../TokenItem/TokenItem";

const NativeToken = observer(() => {
  const { zondStore } = useStore();
  const { activeAccount, getAccountBalance } = zondStore;
  const { accountAddress } = activeAccount;

  const name = "Quanta";
  const balance = getAccountBalance(accountAddress);
  const symbol = "QRL";

  return (
    <TokenListItem
      icon="icons/qrl/default.png"
      balance={balance}
      name={name}
      symbol={symbol}
    />
  );
});

export default NativeToken;
