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
import { Download, Loader } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BackButton from "../Shared/BackButton/BackButton";

const FormSchema = z.object({
  contractAddress: z.string().min(1, "Contract address is required"),
});

const ImportToken = observer(() => {
  const { zondStore } = useStore();
  const { getTokenDetails } = zondStore;

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    console.log(">>>formData", formData);
    const result = await getTokenDetails(
      "0x28c4113a9d3a2e836f28c23ed8e3c1e7c243f566",
    );
    console.log(">>>result", result);
  }

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
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <>
      <img
        className="fixed z-0 h-96 w-96 -translate-x-8 animate-rotate-scale overflow-hidden opacity-30"
        src="tree.svg"
      />
      <div className="relative z-10 p-8">
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
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  {isSubmitting ? "Importing token" : "Import token"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
});

export default ImportToken;
