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
import { ROUTES } from "@/router/router";
import { useStore } from "@/stores/store";
import StorageUtil from "@/utilities/storageUtil";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionReceipt, validator } from "@theqrl/web3";
import { Loader, Send, X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import BackButton from "../Shared/BackButton/BackButton";
import AccountAddressSection from "./AccountAddressSection/AccountAddressSection";
import { GasFeeNotice } from "./GasFeeNotice/GasFeeNotice";
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

const AccountDetails = observer(() => {
  const navigate = useNavigate();
  const { zondStore } = useStore();
  const {
    activeAccount,
    signAndSendTransaction,
    zondConnection,
    fetchAccounts,
  } = zondStore;
  const { blockchain } = zondConnection;
  const { accountAddress } = activeAccount;

  const [transactionReceipt, setTransactionReceipt] =
    useState<TransactionReceipt>();

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      const { transactionReceipt, error } = await signAndSendTransaction(
        accountAddress,
        formData.receiverAddress,
        formData.amount,
        formData.mnemonicPhrases,
      );

      if (error) {
        control.setError("mnemonicPhrases", {
          message: `An error occured. ${error}`,
        });
      } else {
        const isTransactionSuccessful =
          transactionReceipt?.status.toString() === "1";
        if (isTransactionSuccessful) {
          StorageUtil.clearTransactionValues(blockchain);
          resetForm();
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

  const resetForm = () => {
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
    defaultValues: async () => StorageUtil.getTransactionValues(blockchain),
  });
  const {
    reset,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  useEffect(() => {
    const formWatchSubscription = watch(async (value) => {
      StorageUtil.setTransactionValues(blockchain, value);
    });
    return () => formWatchSubscription.unsubscribe();
  }, [watch]);

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
            <CardHeader>
              <CardTitle>Active account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <AccountAddressSection />
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
                <div className="w-8 pt-8 text-lg">QRL</div>
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
                Send{isSubmitting ? "ing" : ""} Quanta
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
});

export default AccountDetails;
