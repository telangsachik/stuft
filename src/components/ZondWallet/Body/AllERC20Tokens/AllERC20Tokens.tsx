import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import ERC20Tokens from "../Home/AccountCreateImport/ActiveAccountDisplay/TokensCardContent/ERC20Tokens/ERC20Tokens";
import BackButton from "../Shared/BackButton/BackButton";

const AllERC20Tokens = () => {
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
            <CardTitle>All ERC 20 tokens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ERC20Tokens shouldDisplayAllTokens={true} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AllERC20Tokens;
