import { Account } from "@/components/Body/AccountList/Account/Account";
import { Label } from "@/components/ui/label";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";

export const ActiveAccount = observer(() => {
  const { accountStore } = useStore();
  const { activeAccount } = accountStore;
  const { accountAddress } = activeAccount;

  const activeAccountLabel = `${accountAddress ? "Active account" : ""}`;

  const copyAccount = (account: string) => {
    navigator.clipboard.writeText(account);
  };

  return (
    accountAddress && (
      <>
        <Label className="text-secondary">{activeAccountLabel}</Label>
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
