import { createContext, useContext } from "react";
import DAppRequestStore from "./dAppRequestStore";
import SettingsStore from "./settingsStore";
import ZondStore from "./zondStore";

class Store {
  settingsStore;
  dAppRequestStore;
  zondStore;

  constructor() {
    this.settingsStore = new SettingsStore();
    this.dAppRequestStore = new DAppRequestStore();
    this.zondStore = new ZondStore();
  }
}

export type StoreType = InstanceType<typeof Store>;
export const store = new Store();
const StoreContext = createContext(store);
export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
