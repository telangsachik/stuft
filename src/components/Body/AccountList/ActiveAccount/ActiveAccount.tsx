import { Label } from "@/components/ui/label";
import { useStore } from "@/stores/storeContext";
import { Account } from "@components/Body/AccountList/Account/Account";
import { observer } from "mobx-react-lite";

export const ActiveAccount = observer(() => {
  const { accountStore } = useStore();
  const { activeAccount } = accountStore;
  const { accountAddress } = activeAccount;

  const currentAccountLabel = `${activeAccount ? "Current account" : ""}`;

  const copyAccount = (account: string) => {
    navigator.clipboard.writeText(account);
  };

  return (
    activeAccount && (
      <>
        <Label className="text-secondary">{currentAccountLabel}</Label>
        <Account
          onClickHandler={() => copyAccount(accountAddress)}
          buttonVariant="ghost"
          key={accountAddress}
          account={accountAddress}
          accountStatus="active"
        />
      </>
    )
  );
});
