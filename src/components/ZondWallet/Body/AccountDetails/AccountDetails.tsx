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
import { Separator } from "@/components/UI/Separator";
import { useStore } from "@/stores/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { validator } from "@theqrl/web3";
import { Send } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    receiverAddress: z.string().min(1, "Receiver address is required"),
    amount: z.coerce.number().gt(0, "Amount should be more than 0"),
  })
  .refine((fields) => validator.isAddress(fields.receiverAddress), {
    message: "Address is invalid",
    path: ["receiverAddress"],
  });

export const AccountDetails = observer(() => {
  const { zondStore } = useStore();
  const { activeAccount, getAccountBalance } = zondStore;
  const { accountAddress } = activeAccount;

  const accountBalance = getAccountBalance(accountAddress);

  const prefix = accountAddress.substring(0, 2);
  const addressSplit: string[] = [];
  for (let i = 2; i < accountAddress.length; i += 4) {
    addressSplit.push(accountAddress.substring(i, i + 4));
  }

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      control.setError("receiverAddress", {
        message: "An error occured",
      });
    } catch (error) {
      control.setError("receiverAddress", {
        message: `An error occured. ${error}`,
      });
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      receiverAddress: "",
      amount: 0,
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <>
          <img
            className="fixed z-0 h-96 w-96 -translate-x-8 scale-150 overflow-hidden opacity-30"
            src="tree.svg"
          />
          <div className="relative z-10 p-8">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Active account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col gap-2">
                  <div>Account address</div>
                  <div className="font-bold text-secondary">{`${prefix} ${addressSplit.join(" ")}`}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>Available amount</div>
                  <div className="font-bold text-secondary">
                    {accountBalance}
                  </div>
                </div>
                <Separator />
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
                <div className="flex items-center gap-4">
                  <FormField
                    control={control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Amount</Label>
                        <FormControl>
                          <Input
                            {...field}
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
                  <div className="w-8 text-lg">QRL</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={isSubmitting || !isValid} className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send quanta
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      </form>
    </Form>
  );
});
