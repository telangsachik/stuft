import { zondConfig } from "@configuration/zondConfig";
import { getAllAccounts } from "@functions/getAllAccounts";
import { Web3 } from "@theqrl/web3";

const zondHttpProvider = new Web3.providers.HttpProvider(
  zondConfig.zondHttpProvider,
);
const web3 = new Web3(zondHttpProvider);
const zondInstance = web3.zond;

export const fetchZondConnection = async () => {
  return await zondInstance.net.isListening();
};

export const fetchAccounts = async () => {
  return await getAllAccounts(zondInstance);
};
