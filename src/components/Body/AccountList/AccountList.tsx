import { useAcccounts } from "../../../hooks/useAccounts";
import { Account } from "./Account";
import { NewAccount } from "./NewAccount";

export const AccountList = () => {
  const { accountsList } = useAcccounts();

  return (
    <div className="flex flex-col gap-8 p-8">
      <NewAccount />
      <div className="flex flex-col gap-4">
        <span>Current account</span>
        <Account key={234} account={"0xTestAccount"} />
        <span>Other available accounts</span>
        {accountsList?.map((account) => (
          <Account key={account} account={account} />
        ))}
      </div>
    </div>
  );
};
