import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Loader, LockKeyholeOpen } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  password: z.string().min(8, "Password are atleast 8 characters"),
});

/**
 * This component is currently not in use, and will be used once the encryption funcitonality is available in the web3js library.
 */
export const AccountUnlock = observer(() => {
  const { zondStore } = useStore();
  const {
    activeAccount: { accountAddress },
  } = zondStore;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      password: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    console.log(">>>", formData);
    const unlocked = false;
    if (unlocked) {
      control.setError("password", {
        message: "The entered password is correct",
      });
    } else {
      control.setError("password", {
        message: "The entered password is incorrect",
      });
    }
  }

  return (
    <Form {...form}>
      <form className="w-80" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Unlock 0x..{accountAddress.substring(accountAddress.length - 5)}
            </CardTitle>
            <CardDescription className="break-words">
              {accountAddress}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                  <FormDescription>Enter the account password</FormDescription>
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
                <LockKeyholeOpen className="mr-2 h-4 w-4" />
              )}
              Unlock{isSubmitting ? "ing" : ""}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
});
