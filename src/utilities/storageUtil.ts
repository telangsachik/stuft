import { ZOND_PROVIDER } from "@/configuration/zondConfig";

const ACTIVE_PAGE_IDENTIFIER = "ACTIVE_PAGE";
const BLOCKCHAIN_SELECTION_IDENTIFIER = "BLOCKCHAIN_SELECTION";

type BlockchainType = keyof typeof ZOND_PROVIDER;

/**
 * A utility for storing and retrieving states of different components to and from the browser storage.
 */
class StorageUtil {
  /**
   * A function for storing the blockchain selection.
   * Call the getBlockChain function to retrieve the stored value.
   */
  static setBlockChain(selectedBlockchain: string) {
    localStorage.setItem(BLOCKCHAIN_SELECTION_IDENTIFIER, selectedBlockchain);
  }

  static getBlockChain() {
    const DEFAULT_BLOCKCHAIN = ZOND_PROVIDER.TEST_NET.id;
    return (localStorage.getItem(BLOCKCHAIN_SELECTION_IDENTIFIER) ??
      DEFAULT_BLOCKCHAIN) as BlockchainType;
  }

  /**
   * A function for storing the route to be displayed on opening the extension.
   * Call the getActivePage function to retrieve the stored value, and clearActivePage for clearing the stored value.
   */
  static setActivePage(activePage?: string) {
    if (activePage) {
      localStorage.setItem(ACTIVE_PAGE_IDENTIFIER, activePage);
    } else {
      localStorage.removeItem(ACTIVE_PAGE_IDENTIFIER);
    }
  }

  static getActivePage() {
    return localStorage.getItem(ACTIVE_PAGE_IDENTIFIER);
  }

  static clearActivePage() {
    this.setActivePage();
  }
}

export default StorageUtil;
