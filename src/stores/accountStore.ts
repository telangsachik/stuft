import { action, makeAutoObservable, observable } from "mobx";

const ACTIVE_ACCOUNT_IDENTIFIER = "ACTIVE_ACCOUNT";

class AccountStore {
  activeAccount = { accountAddress: "" };

  constructor() {
    makeAutoObservable(this, {
      activeAccount: observable,
      setActiveAccount: action,
    });
    this.loadFromLocalStorage();
  }

  setActiveAccount(accountAddress: string) {
    this.activeAccount = {
      accountAddress,
    };
  }

  loadFromLocalStorage() {
    const activeAccountFromStorage = localStorage.getItem(
      ACTIVE_ACCOUNT_IDENTIFIER,
    );
    if (activeAccountFromStorage) {
      try {
        this.activeAccount = JSON.parse(activeAccountFromStorage);
      } catch (error) {
        console.log("Failed to read current account from storage");
      }
    }
  }
}

export default AccountStore;
