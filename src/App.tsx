import { QRLWallet } from "@/components/QrlWallet/QrlWallet";
import { store, StoreProvider } from "./stores/store";

function App() {
  return (
    <StoreProvider value={store}>
      <QRLWallet />
    </StoreProvider>
  );
}

export default App;
