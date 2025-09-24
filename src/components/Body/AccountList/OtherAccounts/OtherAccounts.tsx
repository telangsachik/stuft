import { Label } from "@/components/ui/label";
import { useAcccountBalances } from "@/hooks/useAccountBalances";
import { useStorage } from "@/hooks/useStorage";
import { Account } from "@components/Body/AccountList/Account/Account";

export const OtherAccounts = () => {
  const { accountBalances } = useAcccountBalances();
  const { activeAccount, setActiveAccount } = useStorage();
  const otherAccountsLabel = `${activeAccount ? "Other accounts" : "Accounts"} in the wallet`;

  const selectAccount = (account: string) => {
    setActiveAccount(account);
  };

  return (
    <>
      <Label className="text-secondary">{otherAccountsLabel}</Label>
      {Object.keys(accountBalances)
        .filter((account) => account !== activeAccount)
        .map((account) => (
          <Account
            onClickHandler={() => selectAccount(account)}
            buttonVariant="outline"
            key={account}
            account={account}
            accountStatus="other"
          />
        ))}
    </>
  );
};
