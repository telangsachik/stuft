import { makeAutoObservable, observable } from "mobx";

const THEME = {
  DARK: "dark",
  LIGHT: "light",
};

class SettingsStore {
  isDarkMode;

  constructor() {
    makeAutoObservable(this, { isDarkMode: observable });
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document?.documentElement?.classList?.add(
      this.isDarkMode ? THEME.DARK : THEME.LIGHT,
    );
  }
}

export default SettingsStore;
