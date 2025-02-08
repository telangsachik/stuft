import { useZondNetwork } from "../../hooks/useNetwork";
import { AccountList } from "./AccountList/AccountList";

export const Body = () => {
  const { hasZondConnection } = useZondNetwork();

  return (
    <div className="mt-16">
      <AccountList />
    </div>
  );
};
