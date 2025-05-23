import { Body } from "@components/Body/Body";
import { Header } from "@components/Header/Header";

export const QRLWallet = () => {
  return (
    <div className="relative flex min-h-[48rem] w-96 flex-col overflow-x-hidden text-secondary">
      <Header />
      <Body />
    </div>
  );
};
