import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";

const ActiveAccountDisplay = observer(() => {
  const { zondStore } = useStore();
  const { activeAccount, getAccountBalance } = zondStore;
  const { accountAddress } = activeAccount;

  const accountBalance = getAccountBalance(accountAddress);

  const prefix = accountAddress.substring(0, 2);
  const addressSplit: string[] = [];
  for (let i = 2; i < accountAddress.length; i += 4) {
    addressSplit.push(accountAddress.substring(i, i + 4));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-around text-center text-xl font-bold text-secondary">
        {accountBalance}
      </div>
      <div className="text-center text-sm">{`${prefix} ${addressSplit.join(" ")}`}</div>
    </div>
  );
});

export default ActiveAccountDisplay;
