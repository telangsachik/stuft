import { fetchZondConnection } from "@functions/zond";
import { useEffect, useState } from "react";

export const useZondNetwork = () => {
  const [hasZondConnection, setHasZondConnection] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const zondConnectionStatus = await fetchZondConnection();
        setHasZondConnection(zondConnectionStatus);
      } catch (err) {
        console.log("Error occured when fetching network status");
      }
    })();
  }, []);

  return { hasZondConnection };
};
