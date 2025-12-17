import { fetchAccounts } from "@/functions/zond";
import { useEffect, useState } from "react";

export const useAcccounts = () => {
  const [accountsList, setAccoutsList] = useState<string[]>([]);

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

  return { accountsList };
};
