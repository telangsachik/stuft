import { AccountList } from "@/components/Body/AccountList/AccountList";
import { AddNewAccount } from "@/components/Body/AddNewAccount/AddNewAccount";
import { Home } from "@/components/Body/Home/Home";
import { ZondWallet } from "@/components/ZondWallet/ZondWallet";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

export const ROUTES = {
  HOME: "/",
  ACCOUNT_LIST: "/account-list",
  NEW_ACCOUNT: "/new-account",
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
        path: ROUTES.ACCOUNT_LIST,
        element: <AccountList />,
      },
      {
        path: ROUTES.NEW_ACCOUNT,
        element: <AddNewAccount />,
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
