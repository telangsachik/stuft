import withSuspense from "@/functions/withSuspense";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import { lazy } from "react";

const ZondWalletLogo = withSuspense(
  lazy(
    () =>
      import(
        "@/components/ZondWeb3Wallet/Header/ZondWalletLogo/ZondWalletLogo"
      ),
  ),
);
const AccountBadge = withSuspense(
  lazy(
    () =>
      import("@/components/ZondWeb3Wallet/Header/AccountBadge/AccountBadge"),
  ),
);

const Header = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection } = zondStore;
  const { isConnected } = zondConnection;

  return (
    <div className="fixed top-0 z-20 flex h-16 w-full items-center justify-between border-b-2 border-secondary bg-background px-4">
      <ZondWalletLogo />
      {isConnected && <AccountBadge />}
    </div>
  );
});

export default Header;
