import { AccountList } from "@/components/ZondWallet/Body/AccountList/AccountList";
import { CreateAccount } from "@/components/ZondWallet/Body/CreateAccount/CreateAccount";
import { Home } from "@/components/ZondWallet/Body/Home/Home";
import { ImportAccount } from "@/components/ZondWallet/Body/ImportAccount/ImportAccount";
import { ZondWallet } from "@/components/ZondWallet/ZondWallet";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

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
        element: <AccountList />,
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
