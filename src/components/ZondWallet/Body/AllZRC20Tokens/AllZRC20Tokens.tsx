import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import ZRC20Tokens from "../Home/AccountCreateImport/ActiveAccountDisplay/TokensCardContent/ZRC20Tokens/ZRC20Tokens";
import BackButton from "../Shared/BackButton/BackButton";

const AllZRC20Tokens = () => {
  return (
    <>
      <img
        className="fixed z-0 h-96 w-96 -translate-x-8 animate-rotate-scale overflow-hidden opacity-30"
        src="tree.svg"
      />
      <div className="relative z-10 p-8">
        <BackButton />
        <Card>
          <CardHeader>
            <CardTitle>All ZRC 20 tokens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ZRC20Tokens shouldDisplayAllTokens={true} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AllZRC20Tokens;
