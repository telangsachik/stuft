import { AdditionalJsonRpcRequestKeys } from "@theqrl/zond-wallet-provider/utils";

export type DAppRequestType = {
  method: string;
  requestData?: AdditionalJsonRpcRequestKeys;
};
export type DAppResponseType = {
  action: string;
  hasApproved: boolean;
  response?: any;
};
