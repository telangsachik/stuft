import { useZondNetwork } from "../../hooks/useNetwork";
import { NoConnection } from "../Shared/NoConnection/NoConnection";
import { AccountList } from "./AccountList/AccountList";

export const Body = () => {
  const { hasZondConnection } = useZondNetwork();

  if (hasZondConnection)
    return (
      <div className="mt-16">
        <AccountList />
      </div>
    );

  return <NoConnection />;
};
