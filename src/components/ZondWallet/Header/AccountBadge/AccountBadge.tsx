import { Button } from "@/components/UI/Button";
import { ROUTES } from "@/router/router";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const AccountBadge = observer(() => {
  const { zondStore } = useStore();
  const {
    activeAccount: { accountAddress },
  } = zondStore;

  const account = accountAddress
    .substring(0, 7)
    .concat("...")
    .concat(accountAddress.substring(accountAddress.length - 5));

  return (
    !!accountAddress && (
      <Link to={ROUTES.ACCOUNT_LIST}>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full px-4 py-2 text-foreground"
        >
          {account}
        </Button>
      </Link>
    )
  );
});
