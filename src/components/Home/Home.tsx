import { useStore } from "@/stores/store";
import { Loader, LockKeyholeOpen } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ConnectionBadge } from "./ConnectionBadge/ConnectionBadge";

export const Home = observer(() => {
  const { accountStore, zondStore } = useStore();
  const { activeAccount } = accountStore;
  const { accountAddress } = activeAccount;
  const { zondConnection } = zondStore;
  const { isLoading, isConnected } = zondConnection;

  return (
    <div className="relative text-foreground">
      <video
        autoPlay
        muted
        loop
        className="absolute -left-24 top-0 z-0 scale-150 overflow-hidden"
      >
        <source src="qrl-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 flex w-full flex-col items-center gap-4 pt-44">
        <img className="h-16 w-16" src="icon.png" />
        {isLoading ? (
          <Loader className="animate-spin text-foreground" size="32" />
        ) : (
          <>
            <ConnectionBadge />
            {isConnected && (
              <Card className="w-80">
                <CardHeader>
                  <CardTitle>
                    Account{" "}
                    {accountAddress.substring(accountAddress.length - 5)}
                  </CardTitle>
                  <CardDescription className="break-words">
                    {accountAddress}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">card content</CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <LockKeyholeOpen className="mr-2 h-4 w-4" /> Unlock
                  </Button>
                </CardFooter>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
});
