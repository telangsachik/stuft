import withSuspense from "@/functions/withSuspense";
import { useStore } from "@/stores/store";
import { cva } from "class-variance-authority";
import { Loader } from "lucide-react";
import { observer } from "mobx-react-lite";
import { lazy } from "react";
import ConnectionFailed from "./ConnectionFailed/ConnectionFailed";

const AccountCreateImport = withSuspense(
  lazy(
    () =>
      import(
        "@/components/ZondWallet/Body/Home/AccountCreateImport/AccountCreateImport"
      ),
  ),
);
const BackgroundVideo = withSuspense(
  lazy(
    () =>
      import(
        "@/components/ZondWallet/Body/Home/BackgroundVideo/BackgroundVideo"
      ),
  ),
);
const ConnectionBadge = withSuspense(
  lazy(
    () =>
      import(
        "@/components/ZondWallet/Body/Home/ConnectionBadge/ConnectionBadge"
      ),
  ),
);

const logoContainerClasses = cva("transition-all duration-1000", {
  variants: {
    isLoading: {
      true: ["pt-16"],
      false: ["pt-0"],
    },
  },
  defaultVariants: {
    isLoading: true,
  },
});

const logoClasses = cva("transition-all duration-1000", {
  variants: {
    isLoading: {
      true: ["h-32 w-32"],
      false: ["h-16 w-16"],
    },
  },
  defaultVariants: {
    isLoading: true,
  },
});

const Home = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection } = zondStore;
  const { isLoading, isConnected } = zondConnection;

  return (
    <>
      <BackgroundVideo />
      <div className="relative z-10 flex w-full flex-col items-center gap-8 p-8">
        <div className={logoContainerClasses({ isLoading })}>
          <img
            className={logoClasses({ isLoading })}
            src="icons/qrl/default.png"
          />
        </div>
        {isLoading ? (
          <Loader className="animate-spin text-foreground" size="86" />
        ) : (
          <div className="flex animate-appear-in flex-col items-center gap-8">
            <ConnectionBadge />
            {isConnected ? <AccountCreateImport /> : <ConnectionFailed />}
          </div>
        )}
      </div>
    </>
  );
});

export default Home;
