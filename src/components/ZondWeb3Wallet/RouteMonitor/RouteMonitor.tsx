import { ROUTES } from "@/router/router";
import { useStore } from "@/stores/store";
import StorageUtil from "@/utilities/storageUtil";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * An empty component that stays inside the ZondWeb3Wallet component to watch for changing routes.
 * This component takes care of scrolling the screen to top on route change and ensures the user is redirected to the same page on opening the extension.
 */
const RouteMonitor = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection } = zondStore;
  const { isConnected } = zondConnection;

  const [previousRouteUsed, setPreviousRouteUsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      const activePage = await StorageUtil.getActivePage();
      if (activePage && isConnected) {
        await StorageUtil.clearActivePage();
        setPreviousRouteUsed(true);
        navigate(activePage);
      } else if (!activePage && isConnected) {
        setPreviousRouteUsed(true);
      } else {
        navigate(ROUTES.HOME);
      }
    })();
  }, [isConnected]);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      if (previousRouteUsed) await StorageUtil.setActivePage(pathname);
    })();
  }, [pathname]);

  return null;
});

export default RouteMonitor;
