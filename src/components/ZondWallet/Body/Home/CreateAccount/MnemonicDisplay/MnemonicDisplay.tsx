import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { getMnemonicFromHexSeed } from "@/functions/getMnemonicFromHexSeed";
import { Web3BaseWalletAccount } from "@theqrl/web3";
import { ArrowRight, Copy, Undo } from "lucide-react";
import { useEffect, useState } from "react";
import { MnemonicWordListing } from "./MnemonicWordListing/MnemonicWordListing";

type MnemonicDisplayProps = {
  account?: Web3BaseWalletAccount;
  onMnemonicNoted: () => void;
};

export const MnemonicDisplay = ({
  account,
  onMnemonicNoted,
}: MnemonicDisplayProps) => {
  const accountAddress = account?.address;
  const accountHexSeed = account?.seed;
  const mnemonic = getMnemonicFromHexSeed(accountHexSeed);

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
    navigator.clipboard.writeText(mnemonic);
    const newTimer = setTimeout(() => {
      setHasJustCopied(false);
    }, 1000);
    setTimer(newTimer);
  };

  const cardDescription = `Don't lose this mnemonic phrases. You may need this someday to import or recover your new account ${accountAddress?.substring(0, 5)}...${accountAddress?.substring(accountAddress?.length - 5)}`;
  const continueWarning =
    "You should only continue if you have backed up the mnemonic phrases. If you haven't, go back and store it safe. There is no going back once you click continue button.";

  return (
    <Card className="text-ellipsis">
      <CardHeader>
        <CardTitle>Keep this safe</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <MnemonicWordListing mnemonic={mnemonic} />
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" type="button">
              <ArrowRight className="mr-2 h-4 w-4" />
              Continue
            </Button>
          </DialogTrigger>
          <DialogContent className="w-80 rounded-md">
            <DialogHeader className="text-left">
              <DialogTitle>Important!</DialogTitle>
              <DialogDescription>{continueWarning}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row gap-4">
              <DialogClose asChild>
                <Button className="w-full" type="button" variant="outline">
                  <Undo className="mr-2 h-4 w-4" />
                  Go back
                </Button>
              </DialogClose>
              <Button
                className="w-full"
                type="button"
                variant="destructive"
                onClick={onMnemonicNoted}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
