import { fetchAccountBalances } from "@functions/zond";
import { useEffect, useState } from "react";

type AccountBalancesType = Awaited<ReturnType<typeof fetchAccountBalances>>;

export const useAcccountBalances = () => {
  const [accountBalances, setAccountBalances] = useState<AccountBalancesType>(
    {},
  );

  useEffect(() => {
    (async () => {
      try {
        const accountBalances = await fetchAccountBalances();
        setAccountBalances(accountBalances);
      } catch (err) {
        console.log("Error occured when fetching accounts");
      }
    })();
  }, []);

  return { accountBalances };
};
