import { Label } from "@/components/ui/label";
import { useAcccountBalances } from "@/hooks/useAccountBalances";
import { useStore } from "@/stores/storeContext";
import { Account } from "@components/Body/AccountList/Account/Account";
import { observer } from "mobx-react-lite";

export const OtherAccounts = observer(() => {
  const { accountBalances } = useAcccountBalances();
  const { accountStore } = useStore();
  const { activeAccount, setActiveAccount } = accountStore;
  const { accountAddress } = activeAccount;

  const otherAccountsLabel = `${activeAccount ? "Other accounts" : "Accounts"} in the wallet`;

  const selectAccount = (account: string) => {
    setActiveAccount(account);
  };

  return (
    <>
      <Label className="text-secondary">{otherAccountsLabel}</Label>
      {Object.keys(accountBalances)
        .filter((account) => account !== accountAddress)
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
});
