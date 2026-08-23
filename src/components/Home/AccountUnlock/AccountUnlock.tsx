import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { Input } from "@/components/UI/Input";
import { useStore } from "@/stores/store";
import { LockKeyholeOpen } from "lucide-react";
import { observer } from "mobx-react-lite";

export const AccountUnlock = observer(() => {
  const { accountStore } = useStore();
  const { activeAccount } = accountStore;
  const { accountAddress } = activeAccount;

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>
          Unlock account {accountAddress.substring(accountAddress.length - 5)}
        </CardTitle>
        <CardDescription className="break-words">
          {accountAddress}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input type="password" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">
          <LockKeyholeOpen className="mr-2 h-4 w-4" /> Unlock
        </Button>
      </CardFooter>
    </Card>
  );
});
