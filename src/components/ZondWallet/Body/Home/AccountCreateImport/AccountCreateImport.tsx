import { Button } from "@/components/UI/Button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { ROUTES } from "@/router/router";
import { Download, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const AccountCreateImport = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Let's start</CardTitle>
        <CardDescription>
          You are connected to the blockchain. Create a new account or import an
          existing account.
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
  );
};
