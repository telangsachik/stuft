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
import { cva } from "class-variance-authority";
import { Download, Plus, Send } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import ActiveAccountDisplay from "./ActiveAccountDisplay/ActiveAccountDisplay";

const accountCreateImportClasses = cva("flex gap-8", {
  variants: {
    hasAccountCreationPreference: {
      true: ["flex-col-reverse"],
      false: ["flex-col"],
    },
  },
  defaultVariants: {
    hasAccountCreationPreference: false,
  },
});

const AccountCreateImport = observer(() => {
  const { state } = useLocation();
  const { zondStore } = useStore();
  const { activeAccount } = zondStore;
  const { accountAddress } = activeAccount;

  const hasActiveAccount = !!accountAddress;
  const hasAccountCreationPreference = !!state?.hasAccountCreationPreference;

  return (
    <div
      className={accountCreateImportClasses({ hasAccountCreationPreference })}
    >
      {hasActiveAccount && (
        <Card className="animate-active-account-in h-64 w-full overflow-hidden">
          <CardHeader>
            <CardTitle>Active account</CardTitle>
          </CardHeader>
          <CardContent>
            <ActiveAccountDisplay />
          </CardContent>
          <CardFooter className="justify-end">
            <Link className="w-full" to={ROUTES.ACCOUNT_DETAILS}>
              <Button className="w-full" type="button">
                <Send className="mr-2 h-4 w-4" />
                Send Quanta
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {hasActiveAccount ? "Add accounts" : "Let's start"}
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
