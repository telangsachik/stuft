import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import { AccountBadge } from "./AccountBadge/AccountBadge";
import { ZondWalletLogo } from "./ZondWalletLogo/ZondWalletLogo";

export const Header = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection } = zondStore;
  const { isConnected } = zondConnection;

  return (
    <div className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b-2 border-secondary bg-background px-4">
      <ZondWalletLogo />
      {isConnected && <AccountBadge />}
    </div>
  );
});
