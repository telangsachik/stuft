import { Label } from "@/components/UI/Label";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import { AccountCard } from "../AccountCard/AccountCard";

export const ActiveAccount = observer(() => {
  const { accountStore } = useStore();
  const { activeAccount } = accountStore;
  const { accountAddress } = activeAccount;

  const activeAccountLabel = `${accountAddress ? "Active account" : ""}`;

  const copyAccount = (account: string) => {
    navigator.clipboard.writeText(account);
  };

  return (
    !!accountAddress && (
      <>
        <Label className="text-secondary">{activeAccountLabel}</Label>
        <AccountCard
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
