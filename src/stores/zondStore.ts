import { zondConfig } from "@/configuration/zondConfig";
import Web3 from "@theqrl/web3";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

const { name, url } = zondConfig.zondHttpProvider;
const zondHttpProvider = new Web3.providers.HttpProvider(url);
const web3 = new Web3(zondHttpProvider);

type ZondAccountType = {
  accountAddress: string;
  accountBalance: bigint;
};

type ZondAccountsType = {
  accounts: ZondAccountType[];
  isLoading: boolean;
};

class ZondStore {
  zondNetworkName = name;
  zondInstance = web3.zond;
  zondConnection = { isConnected: false, isLoading: false };
  zondAccounts: ZondAccountsType = { accounts: [], isLoading: false };

  constructor() {
    makeAutoObservable(this, {
      zondNetworkName: observable,
      zondInstance: observable.struct,
      zondConnection: observable.struct,
      zondAccounts: observable.struct,
      fetchZondConnection: action.bound,
      unlockAccount: action.bound,
    });
    this.fetchZondConnection();
    this.fetchAccounts();
  }

  async fetchZondConnection() {
    this.zondConnection = { ...this.zondConnection, isLoading: true };
    try {
      const isListening = await this.zondInstance.net.isListening();
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
      const accounts = await this.zondInstance.getAccounts();
      const accountsWithBalance: ZondAccountsType["accounts"] =
        await Promise.all(
          accounts.map(async (account) => {
            const accountBalance = await this.zondInstance.getBalance(account);
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
    const unlockStatus = await this.zondInstance.personal.unlockAccount(
      address,
      password,
      UNLOCK_DURATION,
    );
    return unlockStatus;
  }
}

export default ZondStore;
