import { Account } from "@/components/Body/AccountList/Account/Account";
import { Label } from "@/components/UI/label";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";

export const OtherAccounts = observer(() => {
  const { accountStore, zondStore } = useStore();
  const { activeAccount, setActiveAccount } = accountStore;
  const { accountAddress: activeAccountAddress } = activeAccount;
  const { zondAccounts } = zondStore;
  const { accounts } = zondAccounts;

  const otherAccountsLabel = `${activeAccountAddress ? "Other accounts" : "Accounts"} in the wallet`;
  const otherAccounts = accounts.filter(
    ({ accountAddress }) => accountAddress !== activeAccountAddress,
  );

  return (
    otherAccounts.length && (
      <>
        <Label className="text-secondary">{otherAccountsLabel}</Label>
        {otherAccounts.map(({ accountAddress }) => (
          <Account
            onClickHandler={() => setActiveAccount(accountAddress)}
            buttonVariant="outline"
            key={accountAddress}
            account={accountAddress}
            accountStatus="other"
          />
        ))}
      </>
    )
  );
});
