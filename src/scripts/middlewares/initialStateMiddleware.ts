import StorageUtil from "@/utilities/storageUtil";
import { JsonRpcMiddleware } from "@theqrl/zond-wallet-provider/json-rpc-engine";
import { BaseProvider } from "@theqrl/zond-wallet-provider/providers";
import { Json, JsonRpcRequest } from "@theqrl/zond-wallet-provider/utils";
import { REQUEST_METHODS } from "../constants/requestConstants";

export const initialStateMiddleware: JsonRpcMiddleware<
  JsonRpcRequest,
  Json
> = async (req, res, next, end) => {
  const requestedMethod = req.method;
  if (requestedMethod === REQUEST_METHODS.ZOND_WALLET_GET_PROVIDER_STATE) {
    const response: Parameters<BaseProvider["_initializeState"]>[0] =
      await StorageUtil.getProviderState();
    res.result = response;
    end();
  } else {
    next();
  }
};
