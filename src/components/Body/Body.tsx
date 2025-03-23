import { AccountList } from "@components/Body/AccountList/AccountList";
import { NoConnection } from "@components/Shared/NoConnection/NoConnection";
import { useZondNetwork } from "@hooks/useNetwork";

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
