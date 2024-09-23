/**
 *
 * @param {import("@theqrl/web3").Web3ZondInterface} zondInstance
 * @returns {string[]}
 */
const getAllAccounts = async (zondInstance) => {
  const allAccounts = await zondInstance.getAccounts();
  console.log(">>> getAllAccounts:\n", allAccounts);
  return allAccounts;
};

module.exports = { getAllAccounts };
