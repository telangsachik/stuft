import { ROUTES } from "@/router/router";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { AccountBadge } from "./AccountBadge/AccountBadge";

export const Header = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection } = zondStore;
  const { isConnected } = zondConnection;

  return (
    <div className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b-2 border-secondary bg-background px-4">
      <Link to={ROUTES.HOME}>
        <img className="h-16 w-16" src="qrl-logo.svg" />
      </Link>
      {isConnected && <AccountBadge />}
    </div>
  );
});
