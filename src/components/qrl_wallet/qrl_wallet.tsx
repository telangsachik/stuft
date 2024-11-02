import { Body } from "../Body/Body";
import { Header } from "../Header/Header";

export const QRLWallet = () => {
  return (
    <div className="flex flex-col overflow-x-hidden w-96 min-h-[48rem] bg-primary text-secondary relative">
      <Header />
      <Body />
    </div>
  );
};
