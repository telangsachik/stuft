import ActiveAccount from "@/components/ZondWeb3Wallet/Body/AccountList/ActiveAccount/ActiveAccount";
import NewAccount from "@/components/ZondWeb3Wallet/Body/AccountList/NewAccount/NewAccount";
import OtherAccounts from "@/components/ZondWeb3Wallet/Body/AccountList/OtherAccounts/OtherAccounts";
import BackButton from "../Shared/BackButton/BackButton";

const AccountList = () => {
  return (
    <div className="flex flex-col gap-2 p-8">
      <BackButton />
      <div className="flex flex-col gap-4">
        <NewAccount />
        <ActiveAccount />
        <OtherAccounts />
      </div>
    </div>
  );
};

export default AccountList;
