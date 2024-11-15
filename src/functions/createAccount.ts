import { Web3ZondInterface } from "@theqrl/web3";

export const createAccount = async (
  zondInstance: Web3ZondInterface,
  password: string,
) => {
  const newAccountAddress = await zondInstance.personal.newAccount(password);
  console.log(">>> createAccount:\n", newAccountAddress);
  return newAccountAddress;
};
