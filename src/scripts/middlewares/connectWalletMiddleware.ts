import StorageUtil from "@/utilities/storageUtil";
import { JsonRpcMiddleware } from "@theqrl/zond-wallet-provider/json-rpc-engine";
import { providerErrors } from "@theqrl/zond-wallet-provider/rpc-errors";
import { Json, JsonRpcRequest } from "@theqrl/zond-wallet-provider/utils";
import browser from "webextension-polyfill";
import { REQUEST_METHODS } from "../constants/requestConstants";
import { EXTENSION_MESSAGES } from "../constants/streamConstants";
import { DAppRequestType, DAppResponseType } from "./middlewareTypes";

const requestAccountsFromZondWeb3Wallet = async (
  req: JsonRpcRequest<JsonRpcRequest>,
): Promise<DAppResponseType> => {
  return new Promise((resolve) => {
    const request: DAppRequestType = {
      method: req.method,
      requestData: { senderData: req.senderData },
    };
    StorageUtil.setDAppRequestData(request);
    browser.action.openPopup();

    const handleMessage = (message: DAppResponseType) => {
      if (message.action === EXTENSION_MESSAGES.DAPP_RESPONSE) {
        resolve(message);
        // Remove the listener after the message is processed
        browser.runtime.onMessage.removeListener(handleMessage);
      }
    };
    // Listen for the approval/rejection from the UI
    browser.runtime.onMessage.addListener(handleMessage);
  });
};

export const connectWalletMiddleware: JsonRpcMiddleware<
  JsonRpcRequest,
  Json
> = async (req, res, next, end) => {
  const requestedMethod = req.method;
  if (requestedMethod === REQUEST_METHODS.ZOND_REQUEST_ACCOUNT) {
    const message = await requestAccountsFromZondWeb3Wallet(req);
    const hasApproved = message.hasApproved;
    if (hasApproved) {
      const accounts = message?.response?.accounts;
      res.result = accounts;
    } else {
      res.error = providerErrors.userRejectedRequest();
    }
    end();
  } else {
    next();
  }
};
