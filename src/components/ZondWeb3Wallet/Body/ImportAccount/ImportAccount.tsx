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
import { getHexSeedFromMnemonic } from "@/functions/getHexSeedFromMnemonic";
import withSuspense from "@/functions/withSuspense";
import { useStore } from "@/stores/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Web3BaseWalletAccount } from "@theqrl/web3";
import { Download, Loader } from "lucide-react";
import { observer } from "mobx-react-lite";
import { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BackButton from "../Shared/BackButton/BackButton";

const MnemonicWordListing = withSuspense(
  lazy(
    () =>
      import(
        "@/components/ZondWeb3Wallet/Body/CreateAccount/MnemonicDisplay/MnemonicWordListing/MnemonicWordListing"
      ),
  ),
);
const AccountImportSuccess = withSuspense(
  lazy(
    () =>
      import(
        "@/components/ZondWeb3Wallet/Body/ImportAccount/AccountImportSuccess/AccountImportSuccess"
      ),
  ),
);

const FormSchema = z.object({
  mnemonicPhrases: z.string().min(1, "Mnemonic phrases are required"),
});

const ImportAccount = observer(() => {
  const [account, setAccount] = useState<Web3BaseWalletAccount>();
  const [hasAccountImported, setHasAccountImported] = useState(false);
  const { zondStore } = useStore();
  const { zondInstance, setActiveAccount } = zondStore;

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      const account = zondInstance?.accounts.seedToAccount(
        getHexSeedFromMnemonic(formData.mnemonicPhrases.trim()),
      );
      if (account) {
        window.scrollTo(0, 0);
        setAccount(account);
        await setActiveAccount(account.address);
        setHasAccountImported(true);
      } else {
        control.setError("mnemonicPhrases", {
          message: "Account could not be imported from the mnemonic phrases",
        });
      }
    } catch (error) {
      control.setError("mnemonicPhrases", {
        message: `There was an error while reading the mnemonic phrases. ${error}`,
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
        className="fixed z-0 h-96 w-96 -translate-x-8 animate-rotate-scale overflow-hidden opacity-30"
        src="tree.svg"
      />
      <div className="relative z-10 p-8">
        {hasAccountImported ? (
          <AccountImportSuccess account={account} />
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
                            aria-label={field.name}
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
                    {isSubmitting ? "Importing account" : "Import account"}
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

export default ImportAccount;
