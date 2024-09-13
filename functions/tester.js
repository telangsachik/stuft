/**
 *
 * @param {import("@theqrl/web3").Web3ZondInterface} zondInstance
 * @returns {void}
 */
const tester = async (zondInstance) => {
  console.clear();

  const account = await zondInstance.accounts.seedToAccount(
    "f031f1403b57cc67a1622cf07e2d8395a76aa92674ac15e09d3748de04cec8238cae2a876b02f94184962ab161b9801b"
  );
  console.log(">>>Account", account);
};

module.exports = { tester };
