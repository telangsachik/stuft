import StorageUtil from "@/utilities/storageUtil";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * An empty component that stays inside the ZondWallet component to watch for changing routes.
 * This component takes care of scrolling the screen to top on route change and ensures the user is redirected to the same page on opening the extension.
 */
export default function RouteMonitor() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const activePage = StorageUtil.getActivePage();
    if (activePage) {
      StorageUtil.clearActivePage();
      navigate(activePage);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    StorageUtil.setActivePage(pathname);
  }, [pathname]);

  return null;
}
