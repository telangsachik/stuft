export const REQUEST_METHODS = {
  ZOND_WEB3_WALLET_GET_PROVIDER_STATE: "zondWallet_getProviderState",
  ETH_REQUEST_ACCOUNT: "eth_requestAccounts",
} as const;

export const ALLOWED_REQUEST_METHODS = Object.values(REQUEST_METHODS);
