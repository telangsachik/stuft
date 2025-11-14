import { makeAutoObservable, observable } from "mobx";

class SettingsStore {
  isDarkMode;

  constructor() {
    makeAutoObservable(this, { isDarkMode: observable });
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}

export default SettingsStore;
