import { useStore } from "@/stores/store";
import { utils } from "@theqrl/web3";
import { cva } from "class-variance-authority";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

type GasFeeNoticeProps = {
  from: string;
  to: string;
  value: number;
  isSubmitting: boolean;
};

const gasFeeNoticeClasses = cva(
  "m-1 flex justify-around rounded-lg border border-white px-4 py-2",
  {
    variants: {
      isSubmitting: {
        true: ["opacity-30"],
        false: ["opacity-80"],
      },
    },
    defaultVariants: {
      isSubmitting: false,
    },
  },
);

export const GasFeeNotice = ({
  from,
  to,
  value,
  isSubmitting,
}: GasFeeNoticeProps) => {
  const { zondStore } = useStore();
  const { zondInstance } = zondStore;

  const [gasFee, setGasFee] = useState<string>();

  const fetchGasFee = async () => {
    try {
      const transaction = {
        from,
        to,
        value: utils.toWei(value, "ether"),
      };
      const estimatedGas =
        (await zondInstance?.estimateGas(transaction)) ?? BigInt(0);
      const gasPrice = (await zondInstance?.getGasPrice()) ?? BigInt(0);
      const estimatedCost = utils.fromWei(
        BigInt(estimatedGas) * BigInt(gasPrice),
        "ether",
      );
      setGasFee(`${estimatedCost} QRL`);
    } catch (error) {
      setGasFee(`not available. ${error}`);
    }
  };

  useEffect(() => {
    fetchGasFee();
  }, [from, to, value]);

  return (
    <div className={gasFeeNoticeClasses({ isSubmitting })}>
      {gasFee ? (
        <div className="w-full overflow-hidden">
          Estimated gas fee is {gasFee?.toString()}
        </div>
      ) : (
        <div className="flex gap-2">
          <Loader className="h-4 w-4 animate-spin" />
          Estimating gas fee
        </div>
      )}
    </div>
  );
};
