import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { getMnemonicFromHexSeed } from "@/functions/getMnemonicFromHexSeed";
import { ArrowRight, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { MnemonicWordListing } from "./MnemonicWordListing/MnemonicWordListing";

export const MnemonicDisplay = () => {
  const account = "0x20474C36A00aC17239e0c71401f74bCAe12c7D9A";
  const mnemonic = getMnemonicFromHexSeed(
    "0x3500827651de73ea580916b19b042d0656a5ed33cdd09a4c481b000c7606d7aa3f6d7f9cff94fea393230b31a8087bbf",
  );

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

  const onContinue = () => {};

  const cardDescription = `Don't lose this. You may need this someday to import or recover your account ${account.substring(0, 5)}...${account.substring(account.length - 5)}`;

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
        <Button className="w-full" type="button" onClick={onCopy}>
          <Copy className="mr-2 h-4 w-4" />
          {hasJustCopied ? "Copied" : "Copy"}
        </Button>
        <Button className="w-full" type="submit" onClick={onContinue}>
          <ArrowRight className="mr-2 h-4 w-4" />
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};
