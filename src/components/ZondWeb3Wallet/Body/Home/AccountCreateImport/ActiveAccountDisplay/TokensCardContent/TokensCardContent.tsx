import { Button } from "@/components/UI/Button";
import { ROUTES } from "@/router/router";
import { Download } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import NativeToken from "./NativeToken/NativeToken";
import ZRC20Tokens from "./ZRC20Tokens/ZRC20Tokens";

const TokensCardContent = observer(() => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <NativeToken />
        <ZRC20Tokens />
      </div>
      <Link className="w-full" to={ROUTES.IMPORT_TOKEN}>
        <Button className="w-full" type="button">
          <Download className="mr-2 h-4 w-4" />
          Import token
        </Button>
      </Link>
    </div>
  );
});

export default TokensCardContent;
