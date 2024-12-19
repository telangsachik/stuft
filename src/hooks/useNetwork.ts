import { useEffect, useState } from "react";
import { fetchNetwork } from "../functions/zond";

export const useNetwork = () => {
  const [hasNetworkConnection, setHasNetworkConnection] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const zondNetworkStatus = await fetchNetwork();
        setHasNetworkConnection(zondNetworkStatus);
      } catch (err) {
        console.log("Error occured when fetching network status");
      }
    })();
  }, []);

  return { hasNetworkConnection };
};
