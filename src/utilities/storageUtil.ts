const ACTIVE_PAGE_IDENTIFIER = "ACTIVE_PAGE";

/**
 * A utility for storing and retrieving states of different components to and from the browser storage.
 */
class StorageUtil {
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
