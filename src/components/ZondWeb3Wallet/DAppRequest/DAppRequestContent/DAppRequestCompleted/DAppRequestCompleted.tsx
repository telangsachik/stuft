import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { useStore } from "@/stores/store";
import { Check, CircleCheck, CircleX } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const DAppRequestCompleted = observer(() => {
  const { dAppRequestStore } = useStore();
  const { approvalProcessingStatus } = dAppRequestStore;
  const { hasApproved } = approvalProcessingStatus;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Request {hasApproved ? "approved" : "rejected"}</CardTitle>
          <CardDescription>
            The request has been {hasApproved ? "approved" : "rejected"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            {hasApproved ? (
              <CircleCheck className="h-16 w-16" />
            ) : (
              <CircleX className="h-16 w-16" />
            )}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4">
          <div />
          <Button
            className="w-full"
            type="button"
            onClick={() => {
              window.close();
            }}
          >
            <Check className="mr-2 h-4 w-4" />
            Done
          </Button>
        </CardFooter>
      </Card>
    </>
  );
});

export default DAppRequestCompleted;
