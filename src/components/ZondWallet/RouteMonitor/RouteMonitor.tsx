import StorageUtil from "@/utilities/storageUtil";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
