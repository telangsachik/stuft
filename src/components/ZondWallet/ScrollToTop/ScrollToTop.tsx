import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ScrollToTop() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const activePage = localStorage.getItem("ACTIVE_PAGE");
    if (activePage) {
      localStorage.removeItem("ACTIVE_PAGE");
      navigate(activePage);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.setItem("ACTIVE_PAGE", pathname);
  }, [pathname]);

  return null;
}
