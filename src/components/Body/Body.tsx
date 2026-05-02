import { Outlet } from "react-router-dom";

export const Body = () => {
  return (
    <div className="mt-20">
      <Outlet />
    </div>
  );
};
