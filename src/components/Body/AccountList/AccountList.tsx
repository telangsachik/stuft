import { Account } from "@components/Body/AccountList/Account";
import { NewAccount } from "@components/Body/AccountList/NewAccount";
import { useAcccountBalances } from "@hooks/useAccountBalances";

export const AccountList = () => {
  const { accountBalances } = useAcccountBalances();

  return (
    <div className="flex flex-col gap-8 p-8">
      <NewAccount />
      <div className="flex flex-col gap-4">
        {Object.keys(accountBalances).map((account) => (
          <span>
            {account} : {accountBalances[account].toString()}
          </span>
        ))}
        <span>Current account</span>
        <Account key={234} account={"0xTestAccount"} />
        <span>Other available accounts</span>
        {Object.keys(accountBalances).map((account) => (
          <Account key={account} account={account} />
        ))}
      </div>
    </div>
  );
};
