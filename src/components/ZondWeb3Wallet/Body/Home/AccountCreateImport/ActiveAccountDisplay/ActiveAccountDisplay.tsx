import { useStore } from "@/stores/store";
import StringUtil from "@/utilities/stringUtil";
import { observer } from "mobx-react-lite";

const ActiveAccountDisplay = observer(() => {
  const { zondStore } = useStore();
  const { activeAccount, getAccountBalance } = zondStore;
  const { accountAddress } = activeAccount;

  const accountBalance = getAccountBalance(accountAddress);
  const { prefix, addressSplit } = StringUtil.getSplitAddress(accountAddress);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex text-2xl font-bold text-secondary">
        {accountBalance}
      </div>
      <div className="text-sm">{`${prefix} ${addressSplit.join(" ")}`}</div>
    </div>
  );
});

export default ActiveAccountDisplay;
