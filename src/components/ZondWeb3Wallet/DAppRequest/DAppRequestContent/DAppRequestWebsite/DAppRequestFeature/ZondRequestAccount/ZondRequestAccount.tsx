import { Alert, AlertDescription, AlertTitle } from "@/components/UI/Alert";
import { Checkbox } from "@/components/UI/Checkbox";
import AccountId from "@/components/ZondWeb3Wallet/Body/AccountList/AccountId/AccountId";
import { useStore } from "@/stores/store";
import { ShieldAlert } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const ZondRequestAccount = observer(() => {
  const { zondStore, dAppRequestStore } = useStore();
  const { zondAccounts } = zondStore;
  const { accounts, isLoading } = zondAccounts;
  const availableAccounts = accounts.map((account) => account.accountAddress);
  const { addToResponseData, setCanProceed } = dAppRequestStore;

  const [response, setResponse] = useState<{ accounts: string[] }>({
    accounts: [],
  });

  useEffect(() => {
    addToResponseData({ ...response });
  }, [response]);

  const onAccountSelection = (selectedAccount: string, checked: boolean) => {
    let accounts = response.accounts;
    if (checked) {
      accounts = Array.from(new Set([...accounts, selectedAccount]));
    } else {
      accounts = accounts.filter((account) => account !== selectedAccount);
    }
    setCanProceed(accounts.length > 0);
    setResponse({ accounts: [...accounts] });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-2xl font-bold">Connect with Wallet</div>
        <div>Select the accounts you want this site to connect with</div>
      </div>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex h-12 w-full animate-pulse items-center justify-between">
            <div className="h-full w-full rounded-md bg-accent" />
          </div>
        ) : !!availableAccounts.length ? (
          availableAccounts.map((account) => (
            <div className="flex items-start space-x-3">
              <Checkbox
                id={account}
                onCheckedChange={(checked) =>
                  onAccountSelection(account, !!checked)
                }
              />
              <label
                htmlFor={account}
                className="cursor-pointer text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <AccountId account={account} />
              </label>
            </div>
          ))
        ) : (
          <div>No accounts available to connect</div>
        )}
      </div>
      <Alert className="mt-2">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Careful!</AlertTitle>
        <AlertDescription className="text-xs">
          There are token approval scams out there. Ensure you only connect your
          wallet with the websites you trust.
        </AlertDescription>
      </Alert>
    </div>
  );
});

export default ZondRequestAccount;
