const { getAllAccounts } = require("./getAllAccounts");

/**
 *
 * @param {import("@theqrl/web3").Web3ZondInterface} zondInstance
 * @returns {number[]}
 */
const getAllAccountBalances = async (zondInstance) => {
  const allAccounts = await getAllAccounts(zondInstance);
  const allAccountBalances = await Promise.all(
    allAccounts.map(async (account) => {
      const balance = await zondInstance.getBalance(account);
      return `${account}: ${balance}`;
    })
  );
  console.log(">>> getAllAccountBalances:\n", allAccountBalances);
  return allAccountBalances;
};

module.exports = { getAllAccountBalances };
