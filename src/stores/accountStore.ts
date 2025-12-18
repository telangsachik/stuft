import { action, autorun, makeAutoObservable, observable } from "mobx";

const ACTIVE_ACCOUNT_IDENTIFIER = "ACTIVE_ACCOUNT";

type AccountType = {
  accountAddress: string;
};

class AccountStore {
  accounts: AccountType[] = [];
  activeAccount: AccountType = { accountAddress: "" };

  constructor() {
    makeAutoObservable(this, {
      activeAccount: observable.struct,
      setActiveAccount: action.bound,
    });
    this.loadFromLocalStorage();
    autorun(() => {
      this.saveToLocalStorage();
    });
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

  saveToLocalStorage() {
    localStorage.setItem(
      ACTIVE_ACCOUNT_IDENTIFIER,
      JSON.stringify(this.activeAccount),
    );
  }
}

export default AccountStore;
