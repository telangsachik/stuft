/**
 *
 * @param {import("@theqrl/web3").Web3ZondInterface} zondInstance
 * @returns {void}
 */
const unlockAccount = async (
  zondInstance,
  address,
  password,
  unlockDuration
) => {
  const unlockStatus = await zondInstance.personal.unlockAccount(
    address,
    password,
    unlockDuration
  );
  console.log(">>> unlockAccount:\n", unlockStatus);
};

module.exports = { unlockAccount };
