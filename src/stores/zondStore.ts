import { ZOND_PROVIDER } from "@/configuration/zondConfig";
import { getHexSeedFromMnemonic } from "@/functions/getHexSeedFromMnemonic";
import { getQrlBalance } from "@/functions/getQrlBalance";
import StorageUtil from "@/utilities/storageUtil";
import Web3, {
  TransactionReceipt,
  Web3ZondInterface,
  utils,
} from "@theqrl/web3";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

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
    blockchain: "",
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
      signAndSendTransaction: action.bound,
    });
    this.initializeBlockchain();
  }

  async initializeBlockchain() {
    const selectedBlockChain = await StorageUtil.getBlockChain();
    const { name, url } = ZOND_PROVIDER[selectedBlockChain];
    this.zondConnection = {
      ...this.zondConnection,
      zondNetworkName: name,
      blockchain: selectedBlockChain,
    };
    const zondHttpProvider = new Web3.providers.HttpProvider(url);
    const { zond } = new Web3({ provider: zondHttpProvider });
    this.zondInstance = zond;

    await this.fetchZondConnection();
    await this.fetchAccounts();
    await this.validateActiveAccount();
  }

  async selectBlockchain(selectedBlockchain: string) {
    await StorageUtil.setBlockChain(selectedBlockchain);
    await this.initializeBlockchain();
  }

  async setActiveAccount(activeAccount?: string) {
    await StorageUtil.setActiveAccount(
      this.zondConnection.blockchain,
      activeAccount,
    );
    this.activeAccount = {
      ...this.activeAccount,
      accountAddress: activeAccount ?? "",
    };

    let storedAccountList: string[] = [];
    try {
      const accountListFromStorage = await StorageUtil.getAccountList(
        this.zondConnection.blockchain,
      );
      storedAccountList = [...accountListFromStorage];
      if (activeAccount) {
        storedAccountList.push(activeAccount);
      }
      storedAccountList = [...new Set(storedAccountList)];
    } finally {
      await StorageUtil.setAccountList(
        this.zondConnection.blockchain,
        storedAccountList,
      );
      await this.fetchAccounts();
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

    let storedAccountsList: string[] = [];
    const accountListFromStorage = await StorageUtil.getAccountList(
      this.zondConnection.blockchain,
    );
    storedAccountsList = accountListFromStorage;
    try {
      const accountsWithBalance: ZondAccountsType["accounts"] =
        await Promise.all(
          storedAccountsList.map(async (account) => {
            const accountBalance =
              (await this.zondInstance?.getBalance(account)) ?? BigInt(0);
            const convertedAccountBalance = getQrlBalance(
              utils.fromWei(accountBalance, "ether"),
            );
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
        this.zondAccounts = {
          ...this.zondAccounts,
          accounts: storedAccountsList.map((account) => ({
            accountAddress: account,
            accountBalance: "0",
          })),
        };
      });
    } finally {
      runInAction(() => {
        this.zondAccounts = { ...this.zondAccounts, isLoading: false };
      });
    }
  }

  async validateActiveAccount() {
    const storedActiveAccount = await StorageUtil.getActiveAccount(
      this.zondConnection.blockchain,
    );

    const confirmedExistingActiveAccount =
      this.zondAccounts.accounts.find(
        (account) => account.accountAddress === storedActiveAccount,
      )?.accountAddress ?? "";
    if (!confirmedExistingActiveAccount) {
      await StorageUtil.clearActiveAccount(this.zondConnection.blockchain);
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

  async signAndSendTransaction(
    from: string,
    to: string,
    value: number,
    mnemonicPhrases: string,
  ) {
    let transaction: {
      transactionReceipt?: TransactionReceipt;
      error: string;
    } = { transactionReceipt: undefined, error: "" };

    try {
      const transactionObject = {
        from,
        to,
        value: utils.toWei(value, "ether"),
        maxFeePerGas: 21000,
        maxPriorityFeePerGas: 21000,
      };
      const signedTransaction =
        await this.zondInstance?.accounts.signTransaction(
          transactionObject,
          getHexSeedFromMnemonic(mnemonicPhrases),
        );
      if (signedTransaction) {
        const transactionReceipt =
          await this.zondInstance?.sendSignedTransaction(
            signedTransaction?.rawTransaction,
          );
        transaction = { ...transaction, transactionReceipt };
      } else {
        throw new Error("Transaction could not be signed");
      }
    } catch (error) {
      transaction = {
        ...transaction,
        error: `Transaction could not be completed. ${error}`,
      };
    }

    return transaction;
  }
}

export default ZondStore;
