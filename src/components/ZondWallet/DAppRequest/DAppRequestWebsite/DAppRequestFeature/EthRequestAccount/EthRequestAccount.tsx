import { Checkbox } from "@/components/UI/Checkbox";
import AccountId from "@/components/ZondWallet/Body/AccountList/AccountId/AccountId";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

type EthRequestAccountProps = {
  addToResponseData: (data: any) => void;
  decideCanProceed: (decision: boolean) => void;
};

const EthRequestAccount = observer(
  ({ addToResponseData, decideCanProceed }: EthRequestAccountProps) => {
    const { zondStore } = useStore();
    const { zondAccounts } = zondStore;
    const availableAccounts = zondAccounts.accounts.map(
      (account) => account.accountAddress,
    );

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
      decideCanProceed(accounts.length > 0);
      setResponse({ accounts: [...accounts] });
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="text-sm font-bold">
          Connect your zond wallet accounts
        </div>
        {!!availableAccounts.length ? (
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
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <AccountId account={account} />
              </label>
            </div>
          ))
        ) : (
          <div>No accounts available to connect</div>
        )}
      </div>
    );
  },
);

export default EthRequestAccount;
