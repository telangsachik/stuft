import { Button } from "@/components/UI/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/UI/Form";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { getHexSeedFromMnemonic } from "@/functions/getHexSeedFromMnemonic";
import { useStore } from "@/stores/store";
import StringUtil from "@/utilities/stringUtil";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SEND_TRANSACTION_TYPES } from "../ZondSendTransaction";

const FormSchema = z.object({
  mnemonicPhrases: z.string().min(1, "Mnemonic phrases are required"),
});

type ZondSendTransactionForContentProps = {
  transactionType: keyof typeof SEND_TRANSACTION_TYPES;
};

const ZondSendTransactionForContent = observer(
  ({ transactionType }: ZondSendTransactionForContentProps) => {
    const { zondStore, dAppRequestStore } = useStore();
    const { zondInstance, getGasFeeData, zondConnection } = zondStore;
    const { isConnected } = zondConnection;
    const {
      dAppRequestData,
      setOnPermissionCallBack,
      setCanProceed,
      addToResponseData,
      approvalProcessingStatus,
    } = dAppRequestStore;
    const { isProcessing } = approvalProcessingStatus;

    const params = dAppRequestData?.params[0];
    const accountFromAddress = params?.from;
    const { prefix: prefixFrom, addressSplit: addressSplitFrom } =
      StringUtil.getSplitAddress(accountFromAddress);
    const accountToAddress = params?.to;
    const { prefix: prefixTo, addressSplit: addressSplitTo } =
      StringUtil.getSplitAddress(accountToAddress);
    const value = BigInt(params?.value);
    const gasLimit = BigInt(params?.gas);
    const data = params?.data;

    useEffect(() => {
      if (isConnected) {
        const onPermissionCallBack = async (hasApproved: boolean) => {
          if (hasApproved) {
            await deployContract();
          }
        };
        setOnPermissionCallBack(onPermissionCallBack);
      }
    }, [isConnected]);

    const copyData = () => {
      navigator.clipboard.writeText(data);
    };

    const deployContract = async () => {
      const request = dAppRequestData?.params?.[0];
      const mnemonicPhrases = watch().mnemonicPhrases.trim();
      try {
        const { from, data, gas, type, value } = request;
        const gasPrice = await zondInstance?.getGasPrice();
        let transactionObject: any = {
          from,
          data,
          gas,
          value,
          nonce: await zondInstance?.getTransactionCount(from),
        };
        if (type === "0x2") {
          const { maxFeePerGas, maxPriorityFeePerGas } = await getGasFeeData();
          transactionObject.type = "0x2";
          transactionObject.maxPriorityFeePerGas = maxPriorityFeePerGas;
          transactionObject.maxFeePerGas = `0x${maxFeePerGas.toString(16)}`;
        } else {
          transactionObject.gasPrice = gasPrice;
        }
        const signedTransaction = await zondInstance?.accounts.signTransaction(
          transactionObject,
          getHexSeedFromMnemonic(mnemonicPhrases),
        );
        if (signedTransaction) {
          const transactionReceipt = await zondInstance?.sendSignedTransaction(
            signedTransaction?.rawTransaction,
          );
          addToResponseData({
            transactionHash: transactionReceipt?.transactionHash,
          });
        } else {
          throw new Error("Transaction could not be signed");
        }
      } catch (error) {
        addToResponseData({ error });
        console.error("Contract deployment failed:", error);
      }
    };

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      mode: "onChange",
      reValidateMode: "onSubmit",
      defaultValues: {
        mnemonicPhrases: "",
      },
    });
    const {
      watch,
      control,
      formState: { isValid },
    } = form;

    useEffect(() => {
      setCanProceed(isValid);
    }, [isValid]);

    return (
      <div className="flex flex-col gap-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger
              value="details"
              className="data-[state=active]:text-secondary"
            >
              Details
            </TabsTrigger>
            {transactionType !== SEND_TRANSACTION_TYPES.ZND_TRANSFER && (
              <TabsTrigger
                value="data"
                className="data-[state=active]:text-secondary"
              >
                Data
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="details" className="rounded-md bg-muted p-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div>From address</div>
                <div className="w-64 font-bold text-secondary">{`${prefixFrom} ${addressSplitFrom.join(" ")}`}</div>
              </div>
              {(transactionType ===
                SEND_TRANSACTION_TYPES.CONTRACT_INTERACTION ||
                transactionType === SEND_TRANSACTION_TYPES.ZND_TRANSFER) && (
                <div className="flex flex-col gap-1">
                  <div>
                    {transactionType ===
                    SEND_TRANSACTION_TYPES.CONTRACT_INTERACTION
                      ? "Contract "
                      : "To "}
                    address
                  </div>
                  <div className="w-64 font-bold text-secondary">{`${prefixTo} ${addressSplitTo.join(" ")}`}</div>
                </div>
              )}
              {transactionType === SEND_TRANSACTION_TYPES.ZND_TRANSFER && (
                <div className="flex flex-col gap-1">
                  <div>Value</div>
                  <div className="font-bold text-secondary">
                    {value.toString()}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <div>Gas Limit</div>
                <div className="font-bold text-secondary">
                  {gasLimit.toString()}
                </div>
              </div>
            </div>
          </TabsContent>
          {transactionType !== SEND_TRANSACTION_TYPES.ZND_TRANSFER && (
            <TabsContent value="data" className="rounded-md bg-muted p-2">
              <div className="flex flex-col gap-1">
                <div>Data</div>
                <div className="flex gap-2">
                  <div className="max-h-[8rem] w-full overflow-hidden break-words font-bold text-secondary">
                    {data}
                  </div>
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Button
                          className="w-12 hover:text-secondary"
                          variant="outline"
                          size="icon"
                          onClick={copyData}
                        >
                          <Copy size="18" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <Label>Copy Data</Label>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
        <Form {...form}>
          <form
            name="zondSendTransactionContractDeployment"
            aria-label="zondSendTransactionContractDeployment"
            className="w-full"
          >
            <FormField
              control={control}
              name="mnemonicPhrases"
              render={({ field }) => (
                <FormItem>
                  <Label>Mnemonic phrases</Label>
                  <FormControl>
                    <Input
                      {...field}
                      aria-label={field.name}
                      autoComplete="off"
                      disabled={isProcessing}
                      placeholder="Mnemonic Phrases"
                    />
                  </FormControl>
                  <FormDescription>Paste the mnemonic phrases</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  },
);

export default ZondSendTransactionForContent;
