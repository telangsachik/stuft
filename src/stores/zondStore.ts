import { makeAutoObservable, observable } from "mobx";

class ZondStore {
  isDarkMode;

  constructor() {
    makeAutoObservable(this, { isDarkMode: observable });
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}

export default ZondStore;
