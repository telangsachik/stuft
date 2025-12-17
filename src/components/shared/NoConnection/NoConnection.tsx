import { ConnectionBadge } from "@/components/shared/NoConnection/ConnectionBadge/ConnectionBadge";
import { Label } from "@/components/ui/label";

export const NoConnection = () => {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 bg-background p-4">
      <img className="h-16 w-16" src="icon.png" />
      <ConnectionBadge />
      <Label>Not connected to the zond blockchain</Label>
    </div>
  );
};
