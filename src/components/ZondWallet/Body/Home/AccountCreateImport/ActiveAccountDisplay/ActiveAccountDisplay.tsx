import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";

export const ActiveAccountDisplay = observer(() => {
  const { zondStore } = useStore();
  const { activeAccount, getAccountBalance } = zondStore;
  const { accountAddress } = activeAccount;

  const accountBalance = getAccountBalance(accountAddress);

  const prefix = accountAddress.substring(0, 2);
  const idSplit: string[] = [];
  for (let i = 2; i < accountAddress.length; i += 4) {
    idSplit.push(accountAddress.substring(i, i + 4));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div>Account Address:</div>
        <div className="text-base font-bold text-secondary">
          {`${prefix} ${idSplit.join(" ")}`}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>Account Balance</div>
        <div className="text-base font-bold text-secondary">
          {accountBalance}
        </div>
      </div>
    </div>
  );
});
