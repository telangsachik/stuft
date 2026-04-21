import { AccountList } from "@/components/Body/AccountList/AccountList";
import { AddNewAccount } from "@/components/Body/AddNewAccount/AddNewAccount";
import { Home } from "@/components/Home/Home";
import { QRLWallet } from "@/components/QrlWallet/QrlWallet";
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
    element: <QRLWallet />,
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
    element: <QRLWallet />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
