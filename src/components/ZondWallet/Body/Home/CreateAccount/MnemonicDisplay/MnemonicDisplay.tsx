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
import { MnemonicWordListing } from "./MnemonicWordListing/MnemonicWordListing";

export const MnemonicDisplay = () => {
  const account = "0x20474C36A00aC17239e0c71401f74bCAe12c7D9A";
  const mnemonic = getMnemonicFromHexSeed(
    "0x3500827651de73ea580916b19b042d0656a5ed33cdd09a4c481b000c7606d7aa3f6d7f9cff94fea393230b31a8087bbf",
  );

  const cardDescription = `Don't lose this. You may need this someday to import or recover your account ${account.substring(0, 5)}...${account.substring(account.length - 5)}`;

  return (
    <Card className="w-80 text-ellipsis">
      <CardHeader>
        <CardTitle>Keep this safe</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <MnemonicWordListing mnemonic={mnemonic} />
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};
