import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export const NewAccount = () => {
  return (
    <Button className="flex gap-2">
      <Wallet size="18" /> Add new account
    </Button>
  );
};
