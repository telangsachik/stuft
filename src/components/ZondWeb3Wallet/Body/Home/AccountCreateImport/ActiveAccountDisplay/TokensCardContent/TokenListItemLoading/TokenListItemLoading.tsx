import { Card } from "@/components/UI/Card";

const TokenListItemLoading = () => {
  return (
    <Card className="flex h-16 w-full animate-pulse items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-accent" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-36 rounded-md bg-accent" />
          <div className="h-4 w-24 rounded-md bg-accent" />
        </div>
      </div>
      <div className="h-10 w-10 rounded-md bg-accent" />
    </Card>
  );
};

export default TokenListItemLoading;
