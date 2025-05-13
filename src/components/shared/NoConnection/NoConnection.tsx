import { ConnectionBadge } from "@components/shared/NoConnection/ConnectionBadge/ConnectionBadge";

export const NoConnection = () => {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 p-4">
      <img className="h-16 w-16" src="icon.png" />
      <ConnectionBadge />
      <span>Not connected to the zond network</span>
    </div>
  );
};
