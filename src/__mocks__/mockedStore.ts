import { StoreType } from "@/stores/store";
import deepmerge from "deepmerge";
import { createContext, useContext } from "react";
import type { PartialDeep } from "type-fest";

const mockedStoreValues: StoreType = {
  settingsStore: { isDarkMode: true, theme: "dark" },
  zondStore: {
    activeAccount: {
      accountAddress: "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1",
    },
    zondAccounts: {
      isLoading: false,
      accounts: [],
    },
    zondConnection: {
      isConnected: true,
      isLoading: false,
      blockchain: "DEV",
      zondNetworkName: "Zond Local Node",
    },
    zondInstance: undefined,
    fetchAccounts: async () => {},
    fetchZondConnection: async () => {},
    getAccountBalance: (accountAddress: string) => {
      accountAddress;
      return "0 QRL";
    },
    initializeBlockchain: async () => {},
    selectBlockchain: async (selectedBlockchain: string) => {
      selectedBlockchain;
    },
    setActiveAccount: async () => {},
    signAndSendTransaction: async (
      from: string,
      to: string,
      value: number,
      mnemonicPhrases: string,
    ) => {
      from;
      to;
      value;
      mnemonicPhrases;
      return { transactionReceipt: undefined, error: "" };
    },
    validateActiveAccount: async () => {},
    getErc20TokenDetails: async () => ({
      token: undefined,
      error: "",
    }),
  },
};

export const mockedStore = (
  overrideStoreValues: PartialDeep<StoreType> = {},
) => {
  return deepmerge(mockedStoreValues, overrideStoreValues) as StoreType;
};
const StoreContext = createContext(mockedStore);
export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
