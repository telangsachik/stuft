import { ZOND_PROVIDER } from "@/configuration/zondConfig";
import StorageUtil from "@/utilities/storageUtil";
import Web3, { Web3ZondInterface, utils } from "@theqrl/web3";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
const ACTIVE_ACCOUNT_IDENTIFIER = "ACTIVE_ACCOUNT";

type ActiveAccountType = {
  accountAddress: string;
};

type ZondAccountType = {
  accountAddress: string;
  accountBalance: string;
};

type ZondAccountsType = {
  accounts: ZondAccountType[];
  isLoading: boolean;
};

class ZondStore {
  zondInstance?: Web3ZondInterface;
  zondConnection = {
    isConnected: false,
    isLoading: false,
    zondNetworkName: "",
    zondNetworkId: "",
  };
  zondAccounts: ZondAccountsType = { accounts: [], isLoading: false };
  activeAccount: ActiveAccountType = { accountAddress: "" };

  constructor() {
    makeAutoObservable(this, {
      zondInstance: observable.struct,
      zondConnection: observable.struct,
      zondAccounts: observable.struct,
      activeAccount: observable.struct,
      selectBlockchain: action.bound,
      setActiveAccount: action.bound,
      fetchZondConnection: action.bound,
      fetchAccounts: action.bound,
      getAccountBalance: action.bound,
    });
    this.initializeBlockchain();
  }

  async initializeBlockchain() {
    const selectedBlockChain = StorageUtil.getBlockChain();
    const { name, url } = ZOND_PROVIDER[selectedBlockChain];
    this.zondConnection = {
      ...this.zondConnection,
      zondNetworkName: name,
      zondNetworkId: selectedBlockChain,
    };
    const zondHttpProvider = new Web3.providers.HttpProvider(url);
    const { zond } = new Web3({ provider: zondHttpProvider });
    this.zondInstance = zond;

    await this.fetchZondConnection();
    await this.fetchAccounts();
    this.validateActiveAccount();
  }

  selectBlockchain(selectedBlockchain: string) {
    StorageUtil.setBlockChain(selectedBlockchain);
    this.initializeBlockchain();
  }

  setActiveAccount(activeAccount?: string) {
    const blockChainAccountIdentifier = `${this.zondConnection.zondNetworkId}_${ACTIVE_ACCOUNT_IDENTIFIER}`;
    localStorage.setItem(blockChainAccountIdentifier, activeAccount ?? "");
    this.activeAccount = {
      ...this.activeAccount,
      accountAddress: activeAccount ?? "",
    };

    const blockChainAccountListIdentifier = `${this.zondConnection.zondNetworkId}_ACCOUNT_LIST`;
    let storedAccountList: string[] = [];
    try {
      const accountListFromLocalStorage = JSON.parse(
        localStorage.getItem(blockChainAccountListIdentifier) ?? "[]",
      );
      storedAccountList = [...accountListFromLocalStorage];
      if (activeAccount) {
        storedAccountList.push(activeAccount);
      }
      storedAccountList = [...new Set(storedAccountList)];
    } finally {
      localStorage.setItem(
        blockChainAccountListIdentifier,
        JSON.stringify(storedAccountList),
      );
      this.fetchAccounts();
    }
  }

  async fetchZondConnection() {
    this.zondConnection = { ...this.zondConnection, isLoading: true };
    try {
      const isListening = (await this.zondInstance?.net.isListening()) ?? false;
      runInAction(() => {
        this.zondConnection = {
          ...this.zondConnection,
          isConnected: isListening,
        };
      });
    } catch (error) {
      runInAction(() => {
        this.zondConnection = { ...this.zondConnection, isConnected: false };
      });
    } finally {
      runInAction(() => {
        this.zondConnection = { ...this.zondConnection, isLoading: false };
      });
    }
  }

  async fetchAccounts() {
    this.zondAccounts = { ...this.zondAccounts, isLoading: true };
    try {
      const blockChainAccountListIdentifier = `${this.zondConnection.zondNetworkId}_ACCOUNT_LIST`;
      let storedAccountsList: string[] = [];
      const accountListFromLocalStorage = JSON.parse(
        localStorage.getItem(blockChainAccountListIdentifier) ?? "[]",
      );
      storedAccountsList = accountListFromLocalStorage;

      const accountsWithBalance: ZondAccountsType["accounts"] =
        await Promise.all(
          storedAccountsList.map(async (account) => {
            const accountBalance =
              (await this.zondInstance?.getBalance(account)) ?? BigInt(0);
            const convertedAccountBalance = utils
              .fromWei(accountBalance, "ether")
              .concat(" QRL");
            return {
              accountAddress: account,
              accountBalance: convertedAccountBalance,
            };
          }),
        );
      runInAction(() => {
        this.zondAccounts = {
          ...this.zondAccounts,
          accounts: accountsWithBalance,
        };
      });
    } catch (error) {
      runInAction(() => {
        this.zondAccounts = { ...this.zondAccounts };
      });
    } finally {
      runInAction(() => {
        this.zondAccounts = { ...this.zondAccounts, isLoading: false };
      });
    }
  }

  validateActiveAccount() {
    const blockChainAccountIdentifier = `${this.zondConnection.zondNetworkId}_${ACTIVE_ACCOUNT_IDENTIFIER}`;
    const storedActiveAccount =
      localStorage.getItem(blockChainAccountIdentifier) ?? "";
    const confirmedExistingActiveAccount =
      this.zondAccounts.accounts.find(
        (account) => account.accountAddress === storedActiveAccount,
      )?.accountAddress ?? "";
    if (!confirmedExistingActiveAccount) {
      localStorage.removeItem(blockChainAccountIdentifier);
    }
    this.activeAccount = {
      ...this.activeAccount,
      accountAddress: confirmedExistingActiveAccount,
    };
  }

  getAccountBalance(accountAddress: string) {
    return (
      this.zondAccounts.accounts.find(
        (account) => account.accountAddress === accountAddress,
      )?.accountBalance ?? "0 QRL"
    );
  }
}

export default ZondStore;
