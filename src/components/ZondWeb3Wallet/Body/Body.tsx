import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="mt-16">
      <Outlet />
    </div>
  );
};

export default Body;
