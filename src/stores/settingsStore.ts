import { makeAutoObservable } from "mobx";

class SettingsStore {
  isDarkMode;

  constructor() {
    makeAutoObservable(this);
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}

export default SettingsStore;
