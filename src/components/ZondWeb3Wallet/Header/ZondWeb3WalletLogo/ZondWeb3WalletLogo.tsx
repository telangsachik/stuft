import { ROUTES } from "@/router/router";
import { Link } from "react-router-dom";

const ZondWeb3WalletLogo = () => {
  return (
    <Link to={ROUTES.HOME}>
      <span className="flex items-center gap-2">
        <img className="h-6 w-6" src="icons/qrl/default.png" />
        <div className="flex flex-col text-xs font-bold text-secondary">
          <span>Zond</span>
          <span>Wallet</span>
        </div>
      </span>
    </Link>
  );
};

export default ZondWeb3WalletLogo;
