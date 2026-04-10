import { AppRouter } from "@/router/router";
import { store, StoreProvider } from "@/stores/store";

function App() {
  return (
    <StoreProvider value={store}>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
