import { NoConnection } from "@/components/shared/NoConnection/NoConnection";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

export const Body = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection } = zondStore;
  const { isConnected } = zondConnection;

  if (isConnected)
    return (
      <div className="mt-20">
        <Outlet />
      </div>
    );

  return <NoConnection />;
});
