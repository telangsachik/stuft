import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

jest.mock(
  "@/components/ZondWallet/Header/ZondWalletLogo/ZondWalletLogo",
  () => () => <div>Mocked Zond Wallet Logo</div>,
);
jest.mock(
  "@/components/ZondWallet/Header/AccountBadge/AccountBadge",
  () => () => <div>Mocked Account Badge</div>,
);

describe("Header", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the zond wallet logo component and the connection badge component", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Mocked Zond Wallet Logo")).toBeInTheDocument();
      expect(screen.getByText("Mocked Account Badge")).toBeInTheDocument();
    });
  });

  it("should not render the connection badge component if the connection status is false", async () => {
    const mockedStoreValues = mockedStore({
      zondStore: { zondConnection: { isConnected: false } },
    });
    renderComponent(mockedStoreValues);

    await waitFor(() => {
      expect(screen.getByText("Mocked Zond Wallet Logo")).toBeInTheDocument();
      expect(
        screen.queryByText("Mocked Account Badge"),
      ).not.toBeInTheDocument();
    });
  });
});
