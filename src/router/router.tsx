import { lazy, Suspense } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

export const ROUTES = {
  HOME: "/",
  CREATE_ACCOUNT: "/create-account",
  IMPORT_ACCOUNT: "/import-account",
  ACCOUNT_DETAILS: "/account-details",
  ACCOUNT_LIST: "/account-list",
  DEFAULT: "*",
};

const ZondWallet = lazy(() => import("@/components/ZondWallet/ZondWallet"));
const Home = lazy(() => import("@/components/ZondWallet/Body/Home/Home"));
const CreateAccount = lazy(
  () => import("@/components/ZondWallet/Body/CreateAccount/CreateAccount"),
);
const ImportAccount = lazy(
  () => import("@/components/ZondWallet/Body/ImportAccount/ImportAccount"),
);
const AccountList = lazy(
  () => import("@/components/ZondWallet/Body/AccountList/AccountList"),
);

const router = createMemoryRouter([
  {
    path: ROUTES.HOME,
    element: <ZondWallet />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CREATE_ACCOUNT,
        element: (
          <Suspense>
            <CreateAccount />
          </Suspense>
        ),
      },
      {
        path: ROUTES.IMPORT_ACCOUNT,
        element: (
          <Suspense>
            <ImportAccount />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ACCOUNT_DETAILS,
        element: (
          <Suspense>
            <AccountList />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ACCOUNT_LIST,
        element: (
          <Suspense>
            <AccountList />
          </Suspense>
        ),
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
