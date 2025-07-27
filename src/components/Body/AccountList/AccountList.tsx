import { Label } from "@/components/ui/label";
import { Account } from "@components/Body/AccountList/Account";
import { NewAccount } from "@components/Body/AccountList/NewAccount";
import { useAcccountBalances } from "@hooks/useAccountBalances";

export const AccountList = () => {
  const { accountBalances } = useAcccountBalances();

  return (
    <div className="flex flex-col gap-8 p-8">
      <NewAccount />
      <div className="flex flex-col gap-4">
        <Label>Current account</Label>
        <Account key={234} account={"0xTestAccount"} />
        <Label>Other accounts in the wallet</Label>
        {Object.keys(accountBalances).map((account) => (
          <Account key={account} account={account} />
        ))}
      </div>
    </div>
  );
};
