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
import { ArrowRight, Copy, Undo } from "lucide-react";
import { useEffect, useState } from "react";
import { MnemonicWordListing } from "./MnemonicWordListing/MnemonicWordListing";

export const MnemonicDisplay = () => {
  const account = "0x20474C36A00aC17239e0c71401f74bCAe12c7D9A";
  const hexSeed =
    "0x3500827651de73ea580916b19b042d0656a5ed33cdd09a4c481b000c7606d7aa3f6d7f9cff94fea393230b31a8087bbf";
  const mnemonic =
    "crept floor corner lowest darken gunman coupon emit darken daily grew fluffy corner name dairy can defer campus cruise cement corner gunman dairy beam harsh eagle cried dagger half afghan grew embryo cruise lower group adrift corpus crisis daddy affair half kami grew dairy dairy earn havana node havoc gypsy crust haven grew critic crept canary corpus canary coupon beard corner lucy grown census";

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

  const cardDescription = `Don't lose this mnemonic phrases. You may need this someday to import or recover your account ${account.substring(0, 5)}...${account.substring(account.length - 5)}`;
  const continueWarning =
    "You should only continue if you have backed up the mnemonic phrases. If you haven't yet, go back now and store it safe.";

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
              <Button className="w-full" type="button" variant="destructive">
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
