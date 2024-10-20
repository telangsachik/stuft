import { Web3ZondInterface } from "@theqrl/web3";

export const unlockAccount = async (
  zondInstance: Web3ZondInterface,
  address: string,
  password: string,
  unlockDuration: number
) => {
  const unlockStatus = await zondInstance.personal.unlockAccount(
    address,
    password,
    unlockDuration
  );
  console.log(">>> unlockAccount:\n", unlockStatus);
  return unlockStatus;
};
