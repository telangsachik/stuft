import { createContext, useContext } from "react";
import SettingsStore from "./settingsStore";
import ZondStore from "./zondStore";

class Store {
  settingsStore;
  zondStore;

  constructor() {
    this.settingsStore = new SettingsStore();
    this.zondStore = new ZondStore();
  }
}

export const store = new Store();
const StoreContext = createContext(store);
export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
