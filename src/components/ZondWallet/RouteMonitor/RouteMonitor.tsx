import StorageUtility from "@/utility/storageUtility";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RouteMonitor() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const activePage = StorageUtility.getActivePage();
    if (activePage) {
      StorageUtility.clearActivePage();
      navigate(activePage);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    StorageUtility.setActivePage(pathname);
  }, [pathname]);

  return null;
}
