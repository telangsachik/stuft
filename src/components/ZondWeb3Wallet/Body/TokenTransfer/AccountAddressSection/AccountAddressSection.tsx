import { Separator } from "@/components/UI/Separator";
import { useStore } from "@/stores/store";
import StringUtil from "@/utilities/stringUtil";
import { observer } from "mobx-react-lite";

type AccountAddressSectionProps = {
  tokenBalance?: string;
};

const AccountAddressSection = observer(
  ({ tokenBalance }: AccountAddressSectionProps) => {
    const { zondStore } = useStore();
    const { activeAccount, getAccountBalance } = zondStore;
    const { accountAddress } = activeAccount;

    const { prefix, addressSplit } = StringUtil.getSplitAddress(accountAddress);
    const tokenAccountBalance = tokenBalance
      ? tokenBalance
      : getAccountBalance(accountAddress);

    return (
      <>
        <div className="flex flex-col gap-2">
          <div>Account address</div>
          <div className="font-bold text-secondary">{`${prefix} ${addressSplit.join(" ")}`}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div>Balance</div>
          <div className="font-bold text-secondary">{tokenAccountBalance}</div>
        </div>
        <Separator />
      </>
    );
  },
);

export default AccountAddressSection;
