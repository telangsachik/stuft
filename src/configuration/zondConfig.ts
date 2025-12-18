const ZOND_PROVIDER = {
  DEV: { url: "http://localhost:8545", name: "Zond Local Node" },
  TEST_NET: { url: "http://209.250.255.226:3500", name: "Zond Testnet" },
  MAIN_NET: { url: "https://mainnet.zond.com", name: "Zond Mainnet" },
};

export const zondConfig = {
  zondHttpProvider: ZOND_PROVIDER.TEST_NET,
};
