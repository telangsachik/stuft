import { Label } from "@/components/ui/label";
import { useStorage } from "@/hooks/useStorage";
import { Account } from "@components/Body/AccountList/Account";
import { NewAccount } from "@components/Body/AccountList/NewAccount";
import { useAcccountBalances } from "@hooks/useAccountBalances";

export const AccountList = () => {
  const { accountBalances } = useAcccountBalances();
  const { activeAccount, setActiveAccount } = useStorage();
  const currentAccountLabel = `${activeAccount ? "Current account" : ""}`;
  const otherAccountsLabel = `${activeAccount ? "Other accounts" : "Accounts"} in the wallet`;

  const copyAccount = (account: string) => {
    navigator.clipboard.writeText(account);
  };

  const selectAccount = (account: string) => {
    setActiveAccount(account);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <NewAccount />
      <div className="flex flex-col gap-4">
        {activeAccount && (
          <>
            <Label className="text-secondary">{currentAccountLabel}</Label>
            <Account
              onClickHandler={() => copyAccount(activeAccount)}
              buttonVariant="ghost"
              key={activeAccount}
              account={activeAccount}
              accountStatus="active"
            />
          </>
        )}
        <Label className="text-secondary">{otherAccountsLabel}</Label>
        {Object.keys(accountBalances).map((account) => (
          <Account
            onClickHandler={() => selectAccount(account)}
            buttonVariant="outline"
            key={account}
            account={account}
            accountStatus="other"
          />
        ))}
      </div>
    </div>
  );
};
