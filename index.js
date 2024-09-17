const config = require("./config.json");
const { Web3 } = require("@theqrl/web3");
const { getAllAccountBalances } = require("./functions/getAllAccountBalances");
const zondHttpProvider = new Web3.providers.HttpProvider(
  config.zondHttpProvider
);
const web3 = new Web3(zondHttpProvider);
const zondInstance = web3.zond;

const main = async () => {
  await getAllAccountBalances(zondInstance);
};

main();
