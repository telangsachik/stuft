/**
 *
 * @param {import("@theqrl/web3").Web3ZondInterface} zondInstance
 * @param {string} from
 * @param {string} to
 * @param {number} amount
 * @param {string} fromHexSeed
 * @returns {SignTransactionResult}
 */
const signTransaction = async (zondInstance, from, to, amount, fromHexSeed) => {
  const tx = {
    from,
    to,
    value: amount,
    maxFeePerGas: 21000,
    maxPriorityFeePerGas: 21000,
  };
  const signedTx = await zondInstance.accounts.signTransaction(tx, fromHexSeed);
  console.log(">>> signTransaction:\n", signedTx);
  return signedTx;
};

module.exports = { signTransaction };
