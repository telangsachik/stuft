import ActiveAccount from "@/components/ZondWallet/Body/AccountList/ActiveAccount/ActiveAccount";
import NewAccount from "@/components/ZondWallet/Body/AccountList/NewAccount/NewAccount";
import OtherAccounts from "@/components/ZondWallet/Body/AccountList/OtherAccounts/OtherAccounts";
import BackButton from "../Shared/BackButton/BackButton";

const AccountList = () => {
  return (
    <div className="flex flex-col gap-2 p-8">
      <BackButton />
      <div className="flex flex-col gap-6">
        <NewAccount />
        <ActiveAccount />
        <OtherAccounts />
      </div>
    </div>
  );
};

export default AccountList;
