import { AccountList } from "@/components/Body/AccountList/AccountList";
import { NoConnection } from "@/components/shared/NoConnection/NoConnection";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";

export const Body = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection } = zondStore;
  const { isConnected } = zondConnection;

  if (isConnected)
    return (
      <div className="mt-20">
        <AccountList />
      </div>
    );

  return <NoConnection />;
});
