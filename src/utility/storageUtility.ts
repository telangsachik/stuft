const ACTIVE_PAGE_IDENTIFIER = "ACTIVE_PAGE";

class StorageUtility {
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
}

export default StorageUtility;
