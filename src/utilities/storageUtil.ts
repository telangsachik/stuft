import { ZOND_PROVIDER } from "@/configuration/zondConfig";

const ACTIVE_PAGE_IDENTIFIER = "ACTIVE_PAGE";
const BLOCKCHAIN_SELECTION_IDENTIFIER = "BLOCKCHAIN_SELECTION";
const ACTIVE_ACCOUNT_IDENTIFIER = "ACTIVE_ACCOUNT";
const ACCOUNT_LIST_IDENTIFIER = "ACCOUNT_LIST";
const TRANSACTION_VALUES_IDENTIFIER = "TRANSACTION_VALUES";

type BlockchainType = keyof typeof ZOND_PROVIDER;
type TransactionValuesType = {
  receiverAddress?: string;
  amount?: number;
  mnemonicPhrases?: string;
};

/**
 * A utility for storing and retrieving states of different components to and from the browser storage.
 */
class StorageUtil {
  /**
   * A function for storing the transaction state values, so that the user need not fill in the field values if the extension is closed and opened again.
   * Call the getTransactionValues fuction to retieve the stored value.
   */
  static setTransactionValues(transactionValues: TransactionValuesType) {
    const transactionValuesWithDefaultValues = {
      receiverAddress: transactionValues.receiverAddress ?? "",
      amount: transactionValues.amount ?? 0,
      mnemonicPhrases: "",
    };
    localStorage.setItem(
      TRANSACTION_VALUES_IDENTIFIER,
      JSON.stringify(transactionValuesWithDefaultValues),
    );
  }

  static getTransactionValues() {
    let transactionValues = {
      receiverAddress: "",
      amount: 0,
      mnemonicPhrases: "",
    };

    const storedTransactionValues = localStorage.getItem(
      TRANSACTION_VALUES_IDENTIFIER,
    );
    if (storedTransactionValues) {
      transactionValues = JSON.parse(storedTransactionValues);
    }

    return transactionValues;
  }

  static clearTransactionValues() {
    localStorage.removeItem(TRANSACTION_VALUES_IDENTIFIER);
  }

  /**
   * A function for storing the accounts created and imported within the zond wallet extension.
   * Call the getAccountList function to retrieve the stored value.
   */
  static setAccountList(blockchain: string, accountList: string[]) {
    const blockChainAccountListIdentifier = `${blockchain}_${ACCOUNT_LIST_IDENTIFIER}`;
    localStorage.setItem(
      blockChainAccountListIdentifier,
      JSON.stringify(accountList),
    );
  }

  static getAccountList(blockchain: string) {
    const blockChainAccountListIdentifier = `${blockchain}_${ACCOUNT_LIST_IDENTIFIER}`;
    return JSON.parse(
      localStorage.getItem(blockChainAccountListIdentifier) ?? "[]",
    );
  }

  /**
   * A function for storing the active account in the wallet.
   * Call the getActiveAccount function to retrieve the stored value, and clearActiveAccount for clearing the stored value.
   */
  static setActiveAccount(blockchain: string, activeAccount?: string) {
    const blockChainAccountIdentifier = `${blockchain}_${ACTIVE_ACCOUNT_IDENTIFIER}`;
    if (activeAccount) {
      localStorage.setItem(blockChainAccountIdentifier, activeAccount ?? "");
    } else {
      localStorage.removeItem(blockChainAccountIdentifier);
    }
  }

  static getActiveAccount(blockchain: string) {
    const blockChainAccountIdentifier = `${blockchain}_${ACTIVE_ACCOUNT_IDENTIFIER}`;
    return localStorage.getItem(blockChainAccountIdentifier) ?? "";
  }

  static clearActiveAccount(blockchain: string) {
    const blockChainAccountIdentifier = `${blockchain}_${ACTIVE_ACCOUNT_IDENTIFIER}`;
    localStorage.removeItem(blockChainAccountIdentifier);
  }

  /**
   * A function for storing the blockchain selection.
   * Call the getBlockChain function to retrieve the stored value.
   */
  static setBlockChain(selectedBlockchain: string) {
    localStorage.setItem(BLOCKCHAIN_SELECTION_IDENTIFIER, selectedBlockchain);
  }

  static getBlockChain() {
    const DEFAULT_BLOCKCHAIN = ZOND_PROVIDER.MAIN_NET.id;
    return (localStorage.getItem(BLOCKCHAIN_SELECTION_IDENTIFIER) ??
      DEFAULT_BLOCKCHAIN) as BlockchainType;
  }

  /**
   * A function for storing the route to be displayed on opening the extension.
   * Call the getActivePage function to retrieve the stored value.
   */
  static setActivePage(activePage: string) {
    if (activePage) {
      localStorage.setItem(ACTIVE_PAGE_IDENTIFIER, activePage);
    } else {
      localStorage.removeItem(ACTIVE_PAGE_IDENTIFIER);
    }
  }

  static getActivePage() {
    return localStorage.getItem(ACTIVE_PAGE_IDENTIFIER);
  }
}

export default StorageUtil;
