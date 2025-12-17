import { getAllAccounts } from "@/functions/getAllAccounts";
import { Web3ZondInterface } from "@theqrl/web3";

type AccountBalancesType = {
  [x: string]: bigint;
};

export const getAllAccountBalances = async (
  zondInstance: Web3ZondInterface,
) => {
  const allAccounts = await getAllAccounts(zondInstance);
  const allAccountBalances: AccountBalancesType = {};
  await Promise.all(
    allAccounts.map(async (account) => {
      const balance = await zondInstance.getBalance(account);
      allAccountBalances[account] = balance;
    }),
  );
  console.log(">>> getAllAccountBalances:\n", allAccountBalances);
  return allAccountBalances;
};
