import { useStore } from "@/stores/store";
import { Web3BaseWalletAccount } from "@theqrl/web3";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { AccountCreationForm } from "./AccountCreationForm/AccountCreationForm";
import { AccountCreationSuccess } from "./AccountCreationSuccess/AccountCreationSuccess";
import { MnemonicDisplay } from "./MnemonicDisplay/MnemonicDisplay";

export const CreateAccount = observer(() => {
  const { zondStore } = useStore();
  const { setActiveAccount } = zondStore;

  const [account, setAccount] = useState<Web3BaseWalletAccount>();
  const [hasAccountCreated, setHasAccountCreated] = useState(false);
  const [hasMnemonicNoted, setHasMnemonicNoted] = useState(false);

  const onAccountCreated = (account?: Web3BaseWalletAccount) => {
    if (account) {
      setAccount(account);
      setHasAccountCreated(true);
    }
  };

  const onMnemonicNoted = () => {
    setActiveAccount(account?.address);
    setHasMnemonicNoted(true);
  };

  return hasAccountCreated ? (
    hasMnemonicNoted ? (
      <AccountCreationSuccess account={account} />
    ) : (
      <MnemonicDisplay account={account} onMnemonicNoted={onMnemonicNoted} />
    )
  ) : (
    <AccountCreationForm onAccountCreated={onAccountCreated} />
  );
});
