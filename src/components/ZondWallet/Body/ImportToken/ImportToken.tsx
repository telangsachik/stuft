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
import { Loader, RefreshCw } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BackButton from "../Shared/BackButton/BackButton";
import TokenImportSuccess from "./TokenImportSuccess/TokenImportSuccess";

const FormSchema = z.object({
  contractAddress: z.string().min(1, "Contract address is required"),
});

const ImportToken = observer(() => {
  const { zondStore } = useStore();
  const { getErc20TokenDetails } = zondStore;

  const [token, setToken] =
    useState<Awaited<ReturnType<typeof getErc20TokenDetails>>["token"]>();
  const [hasTokenImported, setHasTokenImported] = useState(false);

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const tokenDetails = await getErc20TokenDetails(formData.contractAddress);
    if (tokenDetails.error) {
      control.setError("contractAddress", { message: tokenDetails.error });
    } else {
      setToken(tokenDetails.token);
      setHasTokenImported(true);
    }
  }

  const onCancelImport = () => {
    reset({ contractAddress: "" });
    setHasTokenImported(false);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      contractAddress: "",
    },
  });
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  return (
    <>
      <img
        className="fixed z-0 h-96 w-96 -translate-x-8 animate-rotate-scale overflow-hidden opacity-30"
        src="tree.svg"
      />
      <div className="relative z-10 p-8">
        {hasTokenImported ? (
          <TokenImportSuccess
            token={token}
            onCancelImport={onCancelImport}
            contractAddress={watch().contractAddress}
          />
        ) : (
          <Form {...form}>
            <BackButton />
            <form
              name="importAccount"
              aria-label="importAccount"
              className="w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Import token</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <FormField
                    control={control}
                    name="contractAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            aria-label={field.name}
                            autoComplete="off"
                            disabled={isSubmitting}
                            placeholder="Contract address"
                          />
                        </FormControl>
                        <FormDescription>
                          Paste the token's contract address
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={isSubmitting || !isValid}
                    className="w-full"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    {isSubmitting
                      ? "Fetching token details"
                      : "Fetch token details"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        )}
      </div>
    </>
  );
});

export default ImportToken;
