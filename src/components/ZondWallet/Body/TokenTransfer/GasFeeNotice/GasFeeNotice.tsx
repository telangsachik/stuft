import { getOptimalGasFee } from "@/functions/getOptimalGasFee";
import { useStore } from "@/stores/store";
import { cva } from "class-variance-authority";
import { Loader } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

type GasFeeNoticeProps = {
  isErc20Token: boolean;
  tokenContractAddress: string;
  tokenDecimals: number;
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

export const GasFeeNotice = observer(
  ({
    isErc20Token,
    tokenContractAddress,
    tokenDecimals,
    from,
    to,
    value,
    isSubmitting,
  }: GasFeeNoticeProps) => {
    const { zondStore } = useStore();
    const { getNativeTokenGas, getErc20TokenGas } = zondStore;

    const hasValuesForGasCalculation = !!from && !!to && !!value;

    const [gasFee, setGasFee] = useState({
      estimatedGas: "",
      isLoading: true,
      error: "",
    });

    const calculateNativeTokenGas = async () => {
      return await getNativeTokenGas();
    };

    const calculateErc20TokenGas = async () => {
      return await getErc20TokenGas(
        from,
        to,
        value,
        tokenContractAddress,
        tokenDecimals,
      );
    };

    const calculateGasFee = async () => {
      setGasFee({ ...gasFee, isLoading: true, error: "" });
      try {
        const gasFeeAmount = await (isErc20Token
          ? calculateErc20TokenGas()
          : calculateNativeTokenGas());
        setGasFee({
          ...gasFee,
          estimatedGas: getOptimalGasFee(gasFeeAmount),
          error: "",
          isLoading: false,
        });
      } catch (error) {
        setGasFee({ ...gasFee, error: `${error}`, isLoading: false });
      }
    };

    useEffect(() => {
      calculateGasFee();
    }, [from, to, value]);

    return (
      hasValuesForGasCalculation && (
        <div className={gasFeeNoticeClasses({ isSubmitting })}>
          {gasFee.isLoading ? (
            <div className="flex gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Estimating gas fee
            </div>
          ) : gasFee.error ? (
            <div>{gasFee.error}</div>
          ) : (
            <div className="w-full overflow-hidden">
              Estimated gas fee is {gasFee?.estimatedGas}
            </div>
          )}
        </div>
      )
    );
  },
);
