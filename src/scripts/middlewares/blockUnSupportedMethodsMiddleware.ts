import { JsonRpcMiddleware } from "@theqrl/zond-wallet-provider/json-rpc-engine";
import { rpcErrors } from "@theqrl/zond-wallet-provider/rpc-errors";
import { Json, JsonRpcRequest } from "@theqrl/zond-wallet-provider/utils";
import { ALLOWED_REQUEST_METHODS } from "../constants/requestConstants";

export const blockUnSupportedMethodsMiddleware: JsonRpcMiddleware<
  JsonRpcRequest,
  Json
> = (req, res, next, end) => {
  const requestedMethod = req.method ?? "";
  if (
    !!requestedMethod.length &&
    ALLOWED_REQUEST_METHODS.includes(
      requestedMethod as (typeof ALLOWED_REQUEST_METHODS)[number],
    )
  ) {
    next();
  } else {
    res.error = rpcErrors.methodNotFound({
      message: `The method "${req.method}" does not exist / is not available.`,
    });
    end();
  }
};
