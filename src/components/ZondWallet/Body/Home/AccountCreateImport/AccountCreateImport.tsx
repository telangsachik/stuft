import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { ROUTES } from "@/router/router";
import { useStore } from "@/stores/store";
import { ArrowRight, Download, Plus } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ActiveAccountDisplay } from "./ActiveAccountDisplay/ActiveAccountDisplay";

const AccountCreateImport = observer(() => {
  const { zondStore } = useStore();
  const { activeAccount } = zondStore;
  const { accountAddress } = activeAccount;

  const hasActiveAccount = !!accountAddress;

  return (
    <div className="flex flex-col gap-8">
      {hasActiveAccount && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Let's continue</CardTitle>
          </CardHeader>
          <CardContent>
            <ActiveAccountDisplay />
          </CardContent>
          <CardFooter className="justify-end">
            <Link to={ROUTES.ACCOUNT_DETAILS}>
              <Button type="button">
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {hasActiveAccount ? "Other options" : "Let's start"}
          </CardTitle>
          <CardDescription>
            You are connected to the blockchain. Create a new account or import
            an existing account.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-4">
          <Link className="w-full" to={ROUTES.CREATE_ACCOUNT}>
            <Button className="w-full" type="button">
              <Plus className="mr-2 h-4 w-4" />
              Create a new account
            </Button>
          </Link>
          <Link className="w-full" to={ROUTES.IMPORT_ACCOUNT}>
            <Button className="w-full" type="button">
              <Download className="mr-2 h-4 w-4" />
              Import an existing account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
});

export default AccountCreateImport;
