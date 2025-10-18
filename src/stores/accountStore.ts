import { makeAutoObservable } from "mobx";

class AccountStore {
  account = {};

  constructor() {
    makeAutoObservable(this);
  }
}

export default AccountStore;
