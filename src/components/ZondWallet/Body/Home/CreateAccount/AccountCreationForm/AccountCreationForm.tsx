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
import { useStore } from "@/stores/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Wallet } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    password: z.string().min(8, "Password must be atleast 8 characters"),
    reEnteredPassword: z
      .string()
      .min(8, "Password must be atleast 8 characters"),
  })
  .refine((fields) => fields.password === fields.reEnteredPassword, {
    message: "Passwords doesn't match",
    path: ["reEnteredPassword"],
  });

type AccountCreationFormProps = {
  onAccountCreation: () => void;
};

export const AccountCreationForm = observer(
  ({ onAccountCreation }: AccountCreationFormProps) => {
    const { zondStore } = useStore();
    const { zondInstance, setActiveAccount } = zondStore;

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      mode: "onChange",
      reValidateMode: "onSubmit",
      defaultValues: {
        password: "",
        reEnteredPassword: "",
      },
    });
    const {
      handleSubmit,
      control,
      formState: { isSubmitting },
    } = form;

    async function onSubmit(formData: z.infer<typeof FormSchema>) {
      try {
        const account =
          zondInstance?.accounts.seedToAccount(
            "0x3500827651de73ea580916b19b042d0656a5ed33cdd09a4c481b000c7606d7aa3f6d7f9cff94fea393230b31a8087bbf",
          ) ?? "";
        console.log(">>> account ", account);
        zondInstance?.accounts.wallet.add(account);
        console.log(">>> wallet", zondInstance?.accounts.wallet.entries());

        // const newAccount = await zondInstance?.personal.newAccount(
        //   formData.password,
        // );
        // setActiveAccount(newAccount);
        // control.setError("reEnteredPassword", {
        //   message: `New account ${newAccount} created`,
        // });
      } catch (error) {
        control.setError("reEnteredPassword", {
          message: `${error} There was an error while creating the account`,
        });
      } finally {
        onAccountCreation();
      }
    }

    return (
      <Form {...form}>
        <form className="w-80" onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Create new account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter a password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="reEnteredPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Re-enter the password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Re-enter the password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button disabled={isSubmitting} className="w-full" type="submit">
                {isSubmitting ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wallet className="mr-2 h-4 w-4" />
                )}
                Create account
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    );
  },
);
