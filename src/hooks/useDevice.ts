import { useEffect, useState } from "react";

export const useDevice = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDarkMode(prefersDark);
  }, []);

  return { isDarkMode };
};
