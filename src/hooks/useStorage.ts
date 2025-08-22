import { useState } from "react";

const ACTIVE_ACCOUNT_IDENTIFIER = "ACTIVE_ACCOUNT";

export const useStorage = () => {
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem(ACTIVE_ACCOUNT_IDENTIFIER) ?? "",
  );

  const setActiveAccount = (account: string) => {
    localStorage.setItem(ACTIVE_ACCOUNT_IDENTIFIER, account);
    setCurrentAccount(account);
  };

  return { activeAccount: currentAccount, setActiveAccount };
};
