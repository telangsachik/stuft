import { Body } from "@/components/ZondWallet/Body/Body";
import { Header } from "@/components/ZondWallet/Header/Header";
import ScrollToTop from "@/components/ZondWallet/ScrollToTop/ScrollToTop";
import { observer } from "mobx-react-lite";

const ZondWallet = observer(() => {
  return (
    <div className="flex min-h-[48rem] w-[26rem] flex-col overflow-x-hidden bg-background text-foreground">
      <ScrollToTop />
      <Header />
      <Body />
    </div>
  );
});

export default ZondWallet;
