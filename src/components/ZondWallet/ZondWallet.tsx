import { Body } from "@/components/ZondWallet/Body/Body";
import { Header } from "@/components/ZondWallet/Header/Header";
import { observer } from "mobx-react-lite";

export const ZondWallet = observer(() => {
  return (
    <div className="relative flex min-h-[48rem] w-96 flex-col overflow-x-hidden bg-background">
      <Header />
      <Body />
    </div>
  );
});
