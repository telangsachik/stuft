import { Outlet } from "react-router-dom";

export const Body = () => {
  return (
    <div className="mt-16">
      <Outlet />
    </div>
  );
};
