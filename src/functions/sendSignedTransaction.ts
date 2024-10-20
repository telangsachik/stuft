import { Web3ZondInterface } from "@theqrl/web3";
import { signTransaction } from "./signTransaction";

export const sendSignedTransaction = async (
  zondInstance: Web3ZondInterface,
  signedTx: Awaited<ReturnType<typeof signTransaction>>
) => {
  const transactionReceipt = await zondInstance.sendSignedTransaction(
    signedTx.rawTransaction
  );
  console.log(">>> sendSignedTransaction:\n", transactionReceipt);
  return transactionReceipt;
};
