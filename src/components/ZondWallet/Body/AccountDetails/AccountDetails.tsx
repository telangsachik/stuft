import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";

export const AccountDetails = observer(() => {
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
    <>
      <img
        className="fixed z-0 h-96 w-96 -translate-x-8 scale-150 overflow-hidden opacity-30"
        src="tree.svg"
      />
      <div className="relative z-10 p-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Active account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div>Account address</div>
                <div className="font-bold text-secondary">{`${prefix} ${addressSplit.join(" ")}`}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div>Account balance</div>
                <div className="font-bold text-secondary">{accountBalance}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
});
