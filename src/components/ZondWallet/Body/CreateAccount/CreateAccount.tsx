import withSuspense from "@/functions/withSuspense";
import { useStore } from "@/stores/store";
import { Web3BaseWalletAccount } from "@theqrl/web3";
import { observer } from "mobx-react-lite";
import { lazy, useState } from "react";
import AccountCreationForm from "./AccountCreationForm/AccountCreationForm";
import AccountCreationSuccess from "./AccountCreationSuccess/AccountCreationSuccess";

const MnemonicDisplay = withSuspense(
  lazy(
    () =>
      import(
        "@/components/ZondWallet/Body/CreateAccount/MnemonicDisplay/MnemonicDisplay"
      ),
  ),
);

const CreateAccount = observer(() => {
  const { zondStore } = useStore();
  const { setActiveAccount } = zondStore;

  const [account, setAccount] = useState<Web3BaseWalletAccount>();
  const [hasAccountCreated, setHasAccountCreated] = useState(false);
  const [hasMnemonicNoted, setHasMnemonicNoted] = useState(false);

  const onAccountCreated = (account?: Web3BaseWalletAccount) => {
    window.scrollTo(0, 0);
    if (account) {
      setAccount(account);
      setActiveAccount(account?.address);
      setHasAccountCreated(true);
    }
  };

  const onMnemonicNoted = () => {
    window.scrollTo(0, 0);
    setHasMnemonicNoted(true);
  };

  return (
    <>
      <img
        className="fixed z-0 h-96 w-96 -translate-x-8 scale-150 overflow-hidden opacity-30"
        src="tree.svg"
      />
      <div className="relative z-10 p-8">
        {hasAccountCreated ? (
          hasMnemonicNoted ? (
            <AccountCreationSuccess account={account} />
          ) : (
            <MnemonicDisplay
              account={account}
              onMnemonicNoted={onMnemonicNoted}
            />
          )
        ) : (
          <AccountCreationForm onAccountCreated={onAccountCreated} />
        )}
      </div>
    </>
  );
});

export default CreateAccount;
