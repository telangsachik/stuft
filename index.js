const config = require("./config.json");
const { Web3 } = require("@theqrl/web3");
const { getAllAccounts } = require("./functions/getAllAccounts");
const { unlockAccount } = require("./functions/unlockAccount");
const zondHttpProvider = new Web3.providers.HttpProvider(
  config.zondHttpProvider
);
const web3 = new Web3(zondHttpProvider);
const zondInstance = web3.zond;

const senderAddress = "0x20D20b8026B8F02540246f58120ddAAf35AECD9B";
const accountPassword = "testpassword";
const unlockDuration = 600;
const receiverAddress = "0x206CFA141776eab624EC25Da0385Ac22A95BEF31";

const main = async () => {
  getAllAccounts(zondInstance);
  unlockAccount(zondInstance, senderAddress, accountPassword, unlockDuration);
};

main();
