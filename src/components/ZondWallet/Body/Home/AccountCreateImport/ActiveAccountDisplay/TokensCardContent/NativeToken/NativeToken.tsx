import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import TokenListItem from "../TokenItem/TokenItem";

const NativeToken = observer(() => {
  const { zondStore } = useStore();
  const { activeAccount, getAccountBalance } = zondStore;
  const { accountAddress } = activeAccount;

  return (
    <TokenListItem
      icon="icons/qrl/default.png"
      balance={getAccountBalance(accountAddress)}
      name="Quanta"
      symbol="QRL"
    />
  );
});

export default NativeToken;
