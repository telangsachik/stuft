import { ZOND_PROVIDER } from "@/configuration/zondConfig";
import Web3, { Web3ZondInterface } from "@theqrl/web3";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

const BLOCKCHAIN_SELECTION_IDENTIFIER = "BLOCKCHAIN_SELECTION";
const DEFAULT_BLOCKCHAIN = ZOND_PROVIDER.TEST_NET.id;
const ACTIVE_ACCOUNT_IDENTIFIER = "ACTIVE_ACCOUNT";

type BlockchainType = keyof typeof ZOND_PROVIDER;

type ActiveAccountType = {
  accountAddress: string;
};

type ZondAccountType = {
  accountAddress: string;
  accountBalance: bigint;
};

type ZondAccountsType = {
  accounts: ZondAccountType[];
  isLoading: boolean;
};

class ZondStore {
  zondInstance?: Web3ZondInterface;
  zondConnection = {
    isConnected: false,
    isLoading: false,
    zondNetworkName: "",
    zondNetworkId: "",
  };
  zondAccounts: ZondAccountsType = { accounts: [], isLoading: false };
  activeAccount: ActiveAccountType = { accountAddress: "" };

  constructor() {
    makeAutoObservable(this, {
      zondInstance: observable.struct,
      zondConnection: observable.struct,
      zondAccounts: observable.struct,
      activeAccount: observable.struct,
      selectBlockchain: action.bound,
      setActiveAccount: action.bound,
      fetchZondConnection: action.bound,
      fetchAccounts: action.bound,
      unlockAccount: action.bound,
    });
    this.initializeBlockchain();
  }

  initializeBlockchain() {
    const selectedBlockChain = (localStorage.getItem(
      BLOCKCHAIN_SELECTION_IDENTIFIER,
    ) ?? DEFAULT_BLOCKCHAIN) as BlockchainType;

    const { name, url } = ZOND_PROVIDER[selectedBlockChain];
    this.zondConnection = {
      ...this.zondConnection,
      zondNetworkName: name,
      zondNetworkId: selectedBlockChain,
    };
    const zondHttpProvider = new Web3.providers.HttpProvider(url);
    const { zond } = new Web3(zondHttpProvider);
    this.zondInstance = zond;

    const storedActiveAccount =
      localStorage.getItem(
        `${this.zondConnection.zondNetworkId}${ACTIVE_ACCOUNT_IDENTIFIER}`,
      ) ?? "";
    this.activeAccount = {
      ...this.activeAccount,
      accountAddress: storedActiveAccount,
    };

    this.fetchZondConnection();
    this.fetchAccounts();
  }

  selectBlockchain(selectedBlockchain: string) {
    localStorage.setItem(BLOCKCHAIN_SELECTION_IDENTIFIER, selectedBlockchain);
    this.initializeBlockchain();
  }

  setActiveAccount(activeAccount?: string) {
    localStorage.setItem(
      `${this.zondConnection.zondNetworkId}${ACTIVE_ACCOUNT_IDENTIFIER}`,
      activeAccount ?? "",
    );
    this.activeAccount = {
      ...this.activeAccount,
      accountAddress: activeAccount ?? "",
    };
  }

  async fetchZondConnection() {
    this.zondConnection = { ...this.zondConnection, isLoading: true };
    try {
      const isListening = (await this.zondInstance?.net.isListening()) ?? false;
      runInAction(() => {
        this.zondConnection = {
          ...this.zondConnection,
          isConnected: isListening,
        };
      });
    } catch (error) {
      runInAction(() => {
        this.zondConnection = { ...this.zondConnection, isConnected: false };
      });
    } finally {
      runInAction(() => {
        this.zondConnection = { ...this.zondConnection, isLoading: false };
      });
    }
  }

  async fetchAccounts() {
    this.zondAccounts = { ...this.zondAccounts, isLoading: true };
    try {
      const accounts = (await this.zondInstance?.getAccounts()) ?? [];
      const accountsWithBalance: ZondAccountsType["accounts"] =
        await Promise.all(
          accounts.map(async (account) => {
            const accountBalance =
              (await this.zondInstance?.getBalance(account)) ?? BigInt(0);
            return { accountAddress: account, accountBalance };
          }),
        );
      runInAction(() => {
        this.zondAccounts = {
          ...this.zondAccounts,
          accounts: accountsWithBalance,
        };
      });
    } catch (error) {
      runInAction(() => {
        this.zondAccounts = { ...this.zondAccounts };
      });
    } finally {
      runInAction(() => {
        this.zondAccounts = { ...this.zondAccounts, isLoading: false };
      });
    }
  }

  async unlockAccount(address: string, password: string) {
    const UNLOCK_DURATION = 60;
    const unlockStatus = await this.zondInstance?.personal.unlockAccount(
      address,
      password,
      UNLOCK_DURATION,
    );
    return unlockStatus;
  }
}

export default ZondStore;
