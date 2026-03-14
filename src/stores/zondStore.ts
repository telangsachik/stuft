import { zondConfig } from "@/configuration/zondConfig";
import { getAllAccounts } from "@/functions/getAllAccounts";
import Web3 from "@theqrl/web3";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

const { name, url } = zondConfig.zondHttpProvider;
const zondHttpProvider = new Web3.providers.HttpProvider(url);
const web3 = new Web3(zondHttpProvider);

type ZondAccountType = {
  accounts: string[];
  isLoading: boolean;
};

class ZondStore {
  zondNetworkName = name;
  zondInstance = web3.zond;
  zondConnection = { isConnected: false, isLoading: false };
  zondAccounts: ZondAccountType = { accounts: [], isLoading: false };

  constructor() {
    makeAutoObservable(this, {
      zondNetworkName: observable,
      zondInstance: observable.struct,
      zondConnection: observable.struct,
      zondAccounts: observable.struct,
      fetchZondConnection: action.bound,
    });
    this.fetchZondConnection();
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
      runInAction(() => {
        this.zondAccounts = {
          ...this.zondAccounts,
          accounts: accounts,
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
    return await getAllAccounts(this.zondInstance);
  }
}

export default ZondStore;
