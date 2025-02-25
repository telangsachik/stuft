import { cva } from "class-variance-authority";
import { useZondNetwork } from "../../../../hooks/useNetwork";

const networkStatusClasses = cva("h-2 w-2 rounded-full", {
  variants: {
    networkStatus: {
      true: ["bg-green"],
      false: ["bg-red"],
    },
  },
  defaultVariants: {
    networkStatus: false,
  },
});

export const ConnectionBadge = () => {
  const { hasZondConnection } = useZondNetwork();

  return (
    <span className="bg-primary_container flex items-center gap-2 rounded-full px-4 py-2">
      <span
        className={networkStatusClasses({
          networkStatus: hasZondConnection,
        })}
      />
      Zond Mainnet
    </span>
  );
};
