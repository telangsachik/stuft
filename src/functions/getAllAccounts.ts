import { Web3ZondInterface } from "@theqrl/web3";

export const getAllAccounts = async (zondInstance: Web3ZondInterface) => {
  const allAccounts = await zondInstance.getAccounts();
  console.log(">>> getAllAccounts:\n", allAccounts);
  return allAccounts;
};
