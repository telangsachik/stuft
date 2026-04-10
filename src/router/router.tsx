import { QRLWallet } from "@/components/QrlWallet/QrlWallet";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const router = createMemoryRouter([
  {
    path: "/",
    element: <QRLWallet />,
  },
  {
    path: "*",
    element: <QRLWallet />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
