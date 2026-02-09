import { zondConfig } from "@/configuration/zondConfig";
import Web3 from "@theqrl/web3";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

const { name, url } = zondConfig.zondHttpProvider;
const zondHttpProvider = new Web3.providers.HttpProvider(url);
const web3 = new Web3(zondHttpProvider);

class ZondStore {
  zondNetworkName = name;
  zondInstance = web3.zond;
  zondConnection = { isConnected: false, isLoading: false };

  constructor() {
    makeAutoObservable(this, {
      zondNetworkName: observable,
      zondInstance: observable.struct,
      zondConnection: observable.struct,
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
}

export default ZondStore;
