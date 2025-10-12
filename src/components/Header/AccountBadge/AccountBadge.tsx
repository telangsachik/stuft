import { Button } from "@/components/ui/button";
import { useStorage } from "@/hooks/useStorage";

export const AccountBadge = () => {
  const { activeAccount } = useStorage();
  const account = activeAccount
    .substring(0, 7)
    .concat("...")
    .concat(activeAccount.substring(activeAccount.length - 5));

  return (
    activeAccount && (
      <Button
        variant="outline"
        className="flex items-center gap-2 rounded-full px-4 py-2 text-foreground"
      >
        {account}
      </Button>
    )
  );
};
