import { useStore } from "@/stores/store";
import StorageUtil from "@/utilities/storageUtil";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ImportedToken from "./ImportedToken/ImportedToken";

const ImportedTokens = observer(() => {
  const { zondStore } = useStore();
  const { activeAccount, zondConnection } = zondStore;
  const { accountAddress } = activeAccount;
  const { blockchain } = zondConnection;

  const [tokenContractsList, setTokenContractsList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const storedTokens = await StorageUtil.getTokenContractsList(
        blockchain,
        accountAddress,
      );
      setTokenContractsList(storedTokens);
    })();
  }, [blockchain, accountAddress]);

  return tokenContractsList.map((contractAddress) => (
    <ImportedToken key={contractAddress} contractAddress={contractAddress} />
  ));
});

export default ImportedTokens;
