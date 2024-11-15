import { Web3ZondInterface } from "@theqrl/web3";
import { getAllAccounts } from "./getAllAccounts";

export const getAllAccountBalances = async (
  zondInstance: Web3ZondInterface,
) => {
  const allAccounts = await getAllAccounts(zondInstance);
  const allAccountBalances = await Promise.all(
    allAccounts.map(async (account) => {
      const balance = await zondInstance.getBalance(account);
      return `${account}: ${balance}`;
    }),
  );
  console.log(">>> getAllAccountBalances:\n", allAccountBalances);
  return allAccountBalances;
};
