import { makeAutoObservable, observable } from "mobx";

const THEME = Object.freeze({
  DARK: "dark",
  LIGHT: "light",
});

class SettingsStore {
  isDarkMode: boolean;
  theme: string;

  constructor() {
    makeAutoObservable(this, { isDarkMode: observable, theme: observable });
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.theme = this.isDarkMode ? THEME.DARK : THEME.LIGHT;
    document?.documentElement?.classList?.add(this.theme);
  }
}

export default SettingsStore;
