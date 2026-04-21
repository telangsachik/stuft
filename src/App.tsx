import { store, StoreProvider } from "@/stores/store";
import { AppRouter } from "./router/router";

function App() {
  return (
    <StoreProvider value={store}>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
