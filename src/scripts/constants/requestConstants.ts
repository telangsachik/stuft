export const UNRESTRICTED_METHODS = Object.freeze({
  ZOND_WEB3_WALLET_GET_PROVIDER_STATE: "zondWallet_getProviderState",
  ZOND_GET_BLOCK_BY_NUMBER: "zond_getBlockByNumber",
  NET_VERSION: "net_version",
  ZOND_ACCOUNTS: "zond_accounts",
  WALLET_REVOKE_PERMISSIONS: "wallet_revokePermissions",
  ZOND_GET_BALANCE: "zond_getBalance",
  ZOND_ESTIMATE_GAS: "zond_estimateGas",
  ZOND_BLOCK_NUMBER: "zond_blockNumber",
  ZOND_GET_TRANSACTION_RECEIPT: "zond_getTransactionReceipt",
  ZOND_GET_TRANSACTION_BY_HASH: "zond_getTransactionByHash",
  ZOND_CALL: "zond_call",
  ZOND_GET_CODE: "zond_getCode",
});

export const RESTRICTED_METHODS = Object.freeze({
  ZOND_REQUEST_ACCOUNTS: "zond_requestAccounts",
  ZOND_SEND_TRANSACTION: "zond_sendTransaction",
});

export const ALL_REQUEST_METHODS = Object.values({
  ...RESTRICTED_METHODS,
  ...UNRESTRICTED_METHODS,
});
