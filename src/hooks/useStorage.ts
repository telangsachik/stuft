import { useState } from "react";

export const useStorage = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  return { currentAccount, setCurrentAccount };
};
