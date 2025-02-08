import { cva } from "class-variance-authority";
import { useZondNetwork } from "../../hooks/useNetwork";

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

export const Header = () => {
  const { hasZondConnection } = useZondNetwork();

  return (
    <div className="fixed top-0 flex h-16 w-full items-center justify-between border-b-2 border-secondary bg-primary px-4">
      <img className="h-16 w-16" src="qrl-logo.svg" />
      <span className="flex items-center gap-2">
        <span
          className={networkStatusClasses({
            networkStatus: hasZondConnection,
          })}
        />
        {hasZondConnection ? "Connected" : "Not Connected"}
      </span>
    </div>
  );
};
