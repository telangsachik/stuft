import { Web3 } from "@theqrl/web3";
import { getAllAccounts } from "./getAllAccounts";
import zondConfig from "./zond.config.json";
const zondHttpProvider = new Web3.providers.HttpProvider(
  zondConfig.zondHttpProvider
);
const web3 = new Web3(zondHttpProvider);
const zondInstance = web3.zond;

export const onClickHandler = () => {
  getAllAccounts(zondInstance);
};
