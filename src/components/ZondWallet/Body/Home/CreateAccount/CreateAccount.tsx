import { observer } from "mobx-react-lite";
import { useState } from "react";
import { MnemonicDisplay } from "./MnemonicDisplay/MnemonicDisplay";

export const CreateAccount = observer(() => {
  const [hasCreatedAccount, setHasCreatedAccount] = useState(false);

  const onAccountCreation = () => {};

  return <MnemonicDisplay />;
  // return <AccountCreationForm onAccountCreation={onAccountCreation} />;
});
