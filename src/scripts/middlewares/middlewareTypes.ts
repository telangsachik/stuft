import { AdditionalJsonRpcRequestKeys } from "@theqrl/zond-wallet-provider/utils";

export type DAppRequestType = {
  method: string;
  params?: any;
  requestData?: AdditionalJsonRpcRequestKeys;
};

export type DAppResponseType = {
  method: string;
  action: string;
  hasApproved: boolean;
  response?: any;
};

export type ConnectedAccountsDataType = {
  urlOrigin: string;
  accounts: string[];
};
