import { Web3ZondInterface } from "@theqrl/web3";

export const signTransaction = async (
  zondInstance: Web3ZondInterface,
  from: string,
  to: string,
  value: number,
  fromHexSeed: string,
) => {
  const tx = {
    from,
    to,
    value,
    maxFeePerGas: 21000,
    maxPriorityFeePerGas: 21000,
  };
  const signedTx = await zondInstance.accounts.signTransaction(tx, fromHexSeed);
  console.log(">>> signTransaction:\n", signedTx);
  return signedTx;
};
