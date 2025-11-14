import { QRLWallet } from "@components/QrlWallet/QrlWallet";
import { store } from "./stores/store";
import { StoreContext } from "./stores/storeContext";

function App() {
  return (
    <StoreContext.Provider value={store}>
      <QRLWallet />
    </StoreContext.Provider>
  );
}

export default App;
