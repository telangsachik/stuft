import { Alert, AlertDescription, AlertTitle } from "@/components/UI/Alert";
import { WifiOff } from "lucide-react";

const ConnectionFailed = () => {
  return (
    <Alert>
      <WifiOff className="h-4 w-4" />
      <AlertTitle>Connection failed</AlertTitle>
      <AlertDescription>
        Please ensure that you are connected to the internet, and the blockchain
        is running.
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionFailed;
