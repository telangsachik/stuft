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
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MnemonicWordListing } from "../CreateAccount/MnemonicDisplay/MnemonicWordListing/MnemonicWordListing";

const FormSchema = z.object({
  mnemonicPhrases: z.string().min(1, "Mnemonic phrases are required"),
});

export const ImportAccount = () => {
  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
    } catch (error) {
      control.setError("mnemonicPhrases", {
        message: `${error} There was an error while reading the mnemonic phrases`,
      });
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      mnemonicPhrases: "",
    },
  });
  const {
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <>
      <img
        className="fixed z-0 h-96 w-96 -translate-x-8 scale-150 overflow-hidden opacity-30"
        src="tree.svg"
      />
      <div className="relative z-10 p-8">
        <Form {...form}>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Import an existing account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <FormField
                  control={control}
                  name="mnemonicPhrases"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="off"
                          disabled={isSubmitting}
                          placeholder="Mnemonic Phrases"
                        />
                      </FormControl>
                      <FormDescription>
                        Paste the mnemonic phrases
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <MnemonicWordListing mnemonic={watch().mnemonicPhrases} />
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
                  Import account
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
};
