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
import TokensCardContent from "./ActiveAccountDisplay/TokensCardContent/TokensCardContent";

const tokensClasses = cva("w-full", {
  variants: {
    hasTokensPreference: {
      true: ["order-first"],
      false: ["order-2"],
    },
  },
  defaultVariants: {
    hasTokensPreference: false,
  },
});

const addAccountsClasses = cva("w-full", {
  variants: {
    hasAccountCreationPreference: {
      true: ["order-first"],
      false: ["order-3"],
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
  const hasTokensPreference = !!state?.hasTokensPreference;

  return (
    <div className="flex flex-col gap-8">
      {hasActiveAccount && (
        <>
          <Card className="order-1 h-64 w-full animate-active-account-in overflow-hidden">
            <CardHeader>
              <CardTitle>Active account</CardTitle>
            </CardHeader>
            <CardContent>
              <ActiveAccountDisplay />
            </CardContent>
            <CardFooter className="justify-end">
              <Link
                className="w-full"
                to={ROUTES.TOKEN_TRANSFER}
                state={{ shouldStartFresh: true }}
              >
                <Button className="w-full" type="button">
                  <Send className="mr-2 h-4 w-4" />
                  Send Quanta
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className={tokensClasses({ hasTokensPreference })}>
            <CardHeader>
              <CardTitle>Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <TokensCardContent />
            </CardContent>
          </Card>
        </>
      )}
      <Card className={addAccountsClasses({ hasAccountCreationPreference })}>
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
