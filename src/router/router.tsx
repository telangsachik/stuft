import AllZRC20Tokens from "@/components/ZondWallet/Body/AllZRC20Tokens/AllZRC20Tokens";
import withSuspense from "@/functions/withSuspense";
import { lazy } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const ZondWallet = withSuspense(
  lazy(() => import("@/components/ZondWallet/ZondWallet")),
);
const Home = withSuspense(
  lazy(() => import("@/components/ZondWallet/Body/Home/Home")),
);
const CreateAccount = withSuspense(
  lazy(
    () => import("@/components/ZondWallet/Body/CreateAccount/CreateAccount"),
  ),
);
const ImportAccount = withSuspense(
  lazy(
    () => import("@/components/ZondWallet/Body/ImportAccount/ImportAccount"),
  ),
);
const ImportToken = withSuspense(
  lazy(() => import("@/components/ZondWallet/Body/ImportToken/ImportToken")),
);
const AccountList = withSuspense(
  lazy(() => import("@/components/ZondWallet/Body/AccountList/AccountList")),
);
const TokenTransfer = withSuspense(
  lazy(
    () => import("@/components/ZondWallet/Body/TokenTransfer/TokenTransfer"),
  ),
);

export const ROUTES = {
  HOME: "/",
  CREATE_ACCOUNT: "/create-account",
  IMPORT_ACCOUNT: "/import-account",
  IMPORT_TOKEN: "/import-token",
  ALL_ZRC_20_TOKENS: "/all-zrc-20-tokens",
  TOKEN_TRANSFER: "/token-transfer",
  ACCOUNT_LIST: "/account-list",
  DEFAULT: "*",
};

const router = createMemoryRouter([
  {
    path: ROUTES.HOME,
    element: <ZondWallet />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.CREATE_ACCOUNT,
        element: <CreateAccount />,
      },
      {
        path: ROUTES.IMPORT_ACCOUNT,
        element: <ImportAccount />,
      },
      {
        path: ROUTES.IMPORT_TOKEN,
        element: <ImportToken />,
      },
      {
        path: ROUTES.ALL_ZRC_20_TOKENS,
        element: <AllZRC20Tokens />,
      },
      {
        path: ROUTES.TOKEN_TRANSFER,
        element: <TokenTransfer />,
      },
      {
        path: ROUTES.ACCOUNT_LIST,
        element: <AccountList />,
      },
    ],
  },
  {
    path: ROUTES.DEFAULT,
    element: <ZondWallet />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
