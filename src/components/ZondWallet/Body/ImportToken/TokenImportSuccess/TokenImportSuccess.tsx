import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { ROUTES } from "@/router/router";
import { StoreType, useStore } from "@/stores/store";
import StorageUtil from "@/utilities/storageUtil";
import { Download, TextSelect, X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

type TokenImportSuccessProps = {
  token: Awaited<
    ReturnType<StoreType["zondStore"]["getErc20TokenDetails"]>
  >["token"];
  onCancelImport: () => void;
  contractAddress: string;
};

const TokenImportSuccess = observer(
  ({ token, onCancelImport, contractAddress }: TokenImportSuccessProps) => {
    const navigate = useNavigate();
    const { zondStore } = useStore();
    const { zondConnection, activeAccount } = zondStore;
    const { blockchain } = zondConnection;
    const { accountAddress } = activeAccount;

    const name = token?.name;
    const symbol = token?.symbol;
    const decimals = token?.decimals;
    const totalSupply = token?.totalSupply;
    const balance = token?.balance;

    const onConfirmImport = async () => {
      await StorageUtil.setTokenContractsList(
        blockchain,
        accountAddress,
        contractAddress,
      );
      navigate(ROUTES.HOME, { state: { hasTokensPreference: true } });
    };

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Import token</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col gap-4">
            <TextSelect size={64} />
            <div className="flex flex-col gap-1">
              <div>Contract address:</div>
              <div className="font-bold text-secondary">{contractAddress}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <div>Name:</div>
              <div className="font-bold text-secondary">{name}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Symbol:</div>
              <div className="font-bold text-secondary">{symbol}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Total supply:</div>
              <div className="font-bold text-secondary">{totalSupply}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Balance:</div>
              <div className="font-bold text-secondary">{balance}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Decimals:</div>
              <div className="font-bold text-secondary">
                {decimals?.toString()}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-4">
          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={onCancelImport}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button className="w-full" type="button" onClick={onConfirmImport}>
            <Download className="mr-2 h-4 w-4" />
            Import
          </Button>
        </CardFooter>
      </Card>
    );
  },
);

export default TokenImportSuccess;
