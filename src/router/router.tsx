import { AccountList } from "@/components/Body/AccountList/AccountList";
import { Home } from "@/components/Body/Home/Home";
import { ZondWallet } from "@/components/ZondWallet/ZondWallet";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

export const ROUTES = {
  HOME: "/",
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
