/**
 *
 * @param {import("@theqrl/web3").Web3ZondInterface} zondInstance
 * @returns {void}
 */
const getAllAccounts = async (zondInstance) => {
  const allAccounts = await zondInstance.getAccounts();
  console.log(">>> getAllAccounts:\n", allAccounts);
};

module.exports = { getAllAccounts };
