import { ActiveAccount } from "@/components/ZondWallet/Body/AccountList/ActiveAccount/ActiveAccount";
import { NewAccount } from "@/components/ZondWallet/Body/AccountList/NewAccount/NewAccount";
import { OtherAccounts } from "@/components/ZondWallet/Body/AccountList/OtherAccounts/OtherAccounts";

export const AccountList = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <NewAccount />
      <div className="flex flex-col gap-4">
        <ActiveAccount />
        <OtherAccounts />
      </div>
    </div>
  );
};
