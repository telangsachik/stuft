/**
 *
 * @param {import("@theqrl/web3").Web3ZondInterface} zondInstance
 * @param {SignTransactionResult} signedTx
 * @returns {TransactionReceipt}
 */
const sendSignedTransaction = async (zondInstance, signedTx) => {
  const transactionReceipt = await zondInstance.sendSignedTransaction(
    signedTx.rawTransaction
  );
  console.log(">>> sendSignedTransaction:\n", transactionReceipt);
  return transactionReceipt;
};

module.exports = { sendSignedTransaction };
