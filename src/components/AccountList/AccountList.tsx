import { useEffect, useState } from "react";
import { fetchAccounts } from "../../functions/zond";
import { Account } from "./Account";

export const AccountList = () => {
  const [accountsList, setAccoutsList] = useState<string[]>();

  useEffect(() => {
    (async () => {
      try {
        const accounts = await fetchAccounts();
        setAccoutsList(accounts);
      } catch (err) {
        console.log("Error occured when fetching accounts");
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-8">
      {accountsList?.map((account) => (
        <Account key={account} account={account} />
      ))}
    </div>
  );
};
