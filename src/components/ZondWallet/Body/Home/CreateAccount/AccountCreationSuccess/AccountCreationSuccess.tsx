import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { Web3BaseWalletAccount } from "@theqrl/web3";
import { ArrowRight, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type AccountCreationSuccessProps = {
  account?: Web3BaseWalletAccount;
};

export const AccountCreationSuccess = ({
  account,
}: AccountCreationSuccessProps) => {
  const accountAddress =
    account?.address ?? "0x20D4E7Fd7fCBCC3f96AE5c0320B63ab6470eb163";
  const accountAddressSplit = [];
  for (let i = 2; i < accountAddress.length; i += 4) {
    accountAddressSplit.push(accountAddress.substring(i, i + 4));
  }
  const spacedAccountAddress = accountAddressSplit.join(" ");

  const [hasJustCopied, setHasJustCopied] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const onCopy = () => {
    setHasJustCopied(true);
    navigator.clipboard.writeText(accountAddress);
    const newTimer = setTimeout(() => {
      setHasJustCopied(false);
    }, 1000);
    setTimer(newTimer);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Account created</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-col gap-2">
          <div>Account public address:</div>
          <div className="font-bold text-secondary">{`0x ${spacedAccountAddress}`}</div>
          <div>
            You can share this account public address with anyone. Others need
            it to interact with you.
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={onCopy}
        >
          <Copy className="mr-2 h-4 w-4" />
          {hasJustCopied ? "Copied" : "Copy"}
        </Button>
        <Button className="w-full" type="button">
          <ArrowRight className="mr-2 h-4 w-4" />
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};
