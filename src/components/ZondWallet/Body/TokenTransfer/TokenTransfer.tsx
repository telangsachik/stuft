import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/AlertDialog";
import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
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
import { NATIVE_TOKEN } from "@/constants/nativeToken";
import { ROUTES } from "@/router/router";
import { useStore } from "@/stores/store";
import StorageUtil from "@/utilities/storageUtil";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionReceipt, validator } from "@theqrl/web3";
import { Loader, Send, X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import BackButton from "../Shared/BackButton/BackButton";
import AccountAddressSection from "./AccountAddressSection/AccountAddressSection";
import { GasFeeNotice } from "./GasFeeNotice/GasFeeNotice";
import TokenDisplaySection from "./TokenDisplaySection/TokenDisplaySection";
import { TransactionSuccessful } from "./TransactionSuccessful/TransactionSuccessful";

const FormSchema = z
  .object({
    receiverAddress: z.string().min(1, "Receiver address is required"),
    amount: z.coerce.number().gt(0, "Amount should be more than 0"),
    mnemonicPhrases: z.string().min(1, "Menmonic phrases are required"),
  })
  .refine((fields) => validator.isAddress(fields.receiverAddress), {
    message: "Address is invalid",
    path: ["receiverAddress"],
  });

const TokenTransfer = observer(() => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { zondStore } = useStore();
  const {
    activeAccount,
    signAndSendNativeToken,
    zondConnection,
    fetchAccounts,
    signAndSendErc20Token,
  } = zondStore;
  const { blockchain } = zondConnection;
  const { accountAddress } = activeAccount;

  const [transactionReceipt, setTransactionReceipt] =
    useState<TransactionReceipt>();
  const [isErc20Token, setIsErc20Token] = useState(false);
  const [tokenContractAddress, setTokenContractAddress] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(0);
  const [tokenIcon, setTokenIcon] = useState(NATIVE_TOKEN.icon);
  const [tokenBalance, setTokenBalance] = useState("");
  const [tokenName, setTokenName] = useState(NATIVE_TOKEN.name);
  const [tokenSymbol, setTokenSymbol] = useState(NATIVE_TOKEN.symbol);

  const sendNativeToken = async (formData: z.infer<typeof FormSchema>) => {
    return await signAndSendNativeToken(
      accountAddress,
      formData.receiverAddress,
      formData.amount,
      formData.mnemonicPhrases,
    );
  };

  const sendErc20Token = async (formData: z.infer<typeof FormSchema>) => {
    return await signAndSendErc20Token(
      accountAddress,
      formData.receiverAddress,
      formData.amount,
      formData.mnemonicPhrases,
      tokenContractAddress,
      tokenDecimals,
    );
  };

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      let transactionData;
      if (isErc20Token) {
        transactionData = await sendErc20Token(formData);
      } else {
        transactionData = await sendNativeToken(formData);
      }
      const { transactionReceipt, error } = transactionData;

      if (error) {
        control.setError("mnemonicPhrases", {
          message: `An error occured. ${error}`,
        });
      } else {
        const isTransactionSuccessful =
          transactionReceipt?.status.toString() === "1";
        if (isTransactionSuccessful) {
          await resetForm();
          setTransactionReceipt(transactionReceipt);
          await fetchAccounts();
          window.scrollTo(0, 0);
        } else {
          control.setError("mnemonicPhrases", {
            message: `Transaction failed.`,
          });
        }
      }
    } catch (error) {
      control.setError("mnemonicPhrases", {
        message: `An error occured. ${error}`,
      });
    }
  }

  const resetForm = async () => {
    await StorageUtil.clearTransactionValues(blockchain);
    reset({ receiverAddress: "", amount: 0, mnemonicPhrases: "" });
  };

  const cancelTransaction = () => {
    resetForm();
    navigate(ROUTES.HOME);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: async () => {
      const storedTransactionValues =
        await StorageUtil.getTransactionValues(blockchain);
      return {
        amount: storedTransactionValues?.amount ?? 0,
        mnemonicPhrases: storedTransactionValues?.mnemonicPhrases ?? "",
        receiverAddress: storedTransactionValues?.receiverAddress ?? "",
      };
    },
  });
  const {
    reset,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  useEffect(() => {
    (async () => {
      const shouldStartFresh = state?.shouldStartFresh;
      if (shouldStartFresh) {
        await resetForm();
      } else {
        const storedTransactionValues =
          await StorageUtil.getTransactionValues(blockchain);
        const tokenDetailsFromStorage = storedTransactionValues?.tokenDetails;
        const tokenDetailsFromState = state?.tokenDetails;
        let tokenDetails = {
          isErc20Token,
          tokenContractAddress,
          tokenDecimals,
          tokenIcon,
          tokenBalance,
          tokenName,
          tokenSymbol,
        };

        if (tokenDetailsFromState) {
          await resetForm();
          setIsErc20Token(tokenDetailsFromState?.isErc20Token);
          setTokenContractAddress(tokenDetailsFromState?.tokenContractAddress);
          setTokenDecimals(tokenDetailsFromState?.tokenDecimals);
          setTokenIcon(tokenDetailsFromState?.tokenIcon);
          setTokenBalance(tokenDetailsFromState?.tokenBalance);
          setTokenName(tokenDetailsFromState?.tokenName);
          setTokenSymbol(tokenDetailsFromState?.tokenSymbol);
          tokenDetails = { ...tokenDetailsFromState };
        } else if (tokenDetailsFromStorage) {
          setIsErc20Token(tokenDetailsFromStorage?.isErc20Token ?? false);
          setTokenContractAddress(
            tokenDetailsFromStorage?.tokenContractAddress,
          );
          setTokenDecimals(tokenDetailsFromStorage?.tokenDecimals);
          setTokenIcon(tokenDetailsFromStorage?.tokenIcon);
          setTokenBalance(tokenDetailsFromStorage?.tokenBalance);
          setTokenName(tokenDetailsFromStorage?.tokenName);
          setTokenSymbol(tokenDetailsFromStorage?.tokenSymbol);
          tokenDetails = { ...tokenDetailsFromStorage };
        }

        await StorageUtil.setTransactionValues(blockchain, {
          amount: watch().amount,
          mnemonicPhrases: watch().mnemonicPhrases,
          receiverAddress: watch().receiverAddress,
          tokenDetails,
        });
      }
    })();
  }, []);

  useEffect(() => {
    const formWatchSubscription = watch(async (value) => {
      await StorageUtil.setTransactionValues(blockchain, {
        ...value,
        tokenDetails: {
          isErc20Token,
          tokenContractAddress,
          tokenDecimals,
          tokenIcon,
          tokenBalance,
          tokenName,
          tokenSymbol,
        },
      });
    });
    return () => formWatchSubscription.unsubscribe();
  }, [
    watch,
    isErc20Token,
    tokenContractAddress,
    tokenDecimals,
    tokenIcon,
    tokenBalance,
    tokenName,
    tokenSymbol,
  ]);

  return transactionReceipt ? (
    <TransactionSuccessful transactionReceipt={transactionReceipt} />
  ) : (
    <Form {...form}>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <img
          className="fixed z-0 h-96 w-96 -translate-x-8 animate-rotate-scale overflow-hidden opacity-30"
          src="tree.svg"
        />
        <div className="relative z-10 p-8">
          <BackButton />
          <Card className="w-full">
            <CardHeader className="flex flex-col gap-6">
              <TokenDisplaySection
                tokenIcon={tokenIcon}
                tokenName={tokenName}
                tokenSymbol={tokenSymbol}
              />
              <CardTitle>Active account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <AccountAddressSection tokenBalance={tokenBalance} />
              <CardTitle>Make a transaction</CardTitle>
              <FormField
                control={control}
                name="receiverAddress"
                render={({ field }) => (
                  <FormItem>
                    <Label>Send to</Label>
                    <FormControl>
                      <Input
                        {...field}
                        aria-label={field.name}
                        autoComplete="off"
                        disabled={isSubmitting}
                        placeholder="Receiver address"
                      />
                    </FormControl>
                    <FormDescription>
                      Receiver&apos;s public address (0x)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-start gap-4">
                <FormField
                  control={control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Amount</Label>
                      <FormControl>
                        <Input
                          {...field}
                          aria-label={field.name}
                          autoComplete="off"
                          disabled={isSubmitting}
                          placeholder="Amount"
                          type="number"
                        />
                      </FormControl>
                      <FormDescription>Amount to send</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-8 pt-8 text-lg">{tokenSymbol}</div>
              </div>
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
                        disabled={isSubmitting}
                        placeholder="Mnemonic phrases"
                      />
                    </FormControl>
                    <FormDescription>
                      Your secret mnemonic phrases
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <GasFeeNotice
                isErc20Token={isErc20Token}
                tokenContractAddress={tokenContractAddress}
                tokenDecimals={tokenDecimals}
                from={accountAddress}
                to={watch().receiverAddress}
                value={watch().amount}
                isSubmitting={isSubmitting}
              />
            </CardContent>
            <CardFooter className="gap-4">
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => cancelTransaction()}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button disabled={isSubmitting || !isValid} className="w-full">
                {isSubmitting ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {isSubmitting
                  ? `Sending ${tokenSymbol}`
                  : `Send ${tokenSymbol}`}
              </Button>
            </CardFooter>
          </Card>
          <AlertDialog open={isSubmitting}>
            <AlertDialogContent className="w-80 rounded-md">
              <AlertDialogHeader className="text-left">
                <AlertDialogTitle>
                  <div className="flex items-center gap-2">
                    <Loader
                      className="animate-spin text-foreground"
                      size="18"
                    />
                    Transaction running
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Please wait while the transaction completes.
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  );
});

export default TokenTransfer;
