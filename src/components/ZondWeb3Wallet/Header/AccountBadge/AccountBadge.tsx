import { Button } from "@/components/UI/Button";
import { ROUTES } from "@/router/router";
import { useStore } from "@/stores/store";
import StringUtil from "@/utilities/stringUtil";
import { Wallet } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const AccountBadge = observer(() => {
  const { zondStore } = useStore();
  const {
    activeAccount: { accountAddress },
  } = zondStore;

  const { prefix, addressSplit } = StringUtil.getSplitAddress(accountAddress);
  const account = `${prefix}${addressSplit[0]}...${addressSplit[addressSplit.length - 1]}`;

  return (
    !!accountAddress && (
      <Link to={ROUTES.ACCOUNT_LIST}>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full px-4 py-2 text-foreground"
        >
          <Wallet className="h-4 w-4" />
          {account}
        </Button>
      </Link>
    )
  );
});

export default AccountBadge;
