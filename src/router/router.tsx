import AccountDetails from "@/components/ZondWallet/Body/AccountDetails/AccountDetails";
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
const AccountList = withSuspense(
  lazy(() => import("@/components/ZondWallet/Body/AccountList/AccountList")),
);

export const ROUTES = {
  HOME: "/",
  CREATE_ACCOUNT: "/create-account",
  IMPORT_ACCOUNT: "/import-account",
  ACCOUNT_DETAILS: "/account-details",
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
        path: ROUTES.ACCOUNT_DETAILS,
        element: <AccountDetails />,
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
