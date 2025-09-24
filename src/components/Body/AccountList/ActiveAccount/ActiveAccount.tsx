import { Label } from "@/components/ui/label";
import { useStorage } from "@/hooks/useStorage";
import { Account } from "@components/Body/AccountList/Account/Account";

export const ActiveAccount = () => {
  const { activeAccount } = useStorage();
  const currentAccountLabel = `${activeAccount ? "Current account" : ""}`;

  const copyAccount = (account: string) => {
    navigator.clipboard.writeText(account);
  };

  return (
    activeAccount && (
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
    )
  );
};
