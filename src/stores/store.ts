import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import SettingsStore from "./settingsStore";
import ZondStore from "./zondStore";

class Store {
  accountStore;
  settingsStore;
  zondStore;

  constructor() {
    this.accountStore = new AccountStore();
    this.settingsStore = new SettingsStore();
    this.zondStore = new ZondStore();
  }
}

export const store = new Store();
const StoreContext = createContext(store);
export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
