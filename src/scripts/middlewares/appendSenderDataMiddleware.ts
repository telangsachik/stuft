import { JsonRpcMiddleware } from "@theqrl/zond-wallet-provider/json-rpc-engine";
import { Json, JsonRpcRequest } from "@theqrl/zond-wallet-provider/utils";
import browser from "webextension-polyfill";

type appendSenderDataParams = {
  sender: browser.Runtime.MessageSender;
};

export const appendSenderDataMiddleware =
  ({
    sender,
  }: appendSenderDataParams): JsonRpcMiddleware<JsonRpcRequest, Json> =>
  (req, _, next) => {
    const { tab } = sender;
    req.senderData = {
      tabId: tab?.id,
      title: tab?.title,
      url: tab?.url,
      favIconUrl: tab?.favIconUrl,
    };
    next();
  };
