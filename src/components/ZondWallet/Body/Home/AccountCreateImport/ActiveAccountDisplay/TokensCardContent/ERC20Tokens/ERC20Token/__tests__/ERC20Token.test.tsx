import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ERC20Token from "../ERC20Token";

describe("ERC20Token", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ERC20Token contractAddress="0x0db3981cb93db985e4e3a62ff695f7a1b242dd7c" />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the erc 20 token component", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          getErc20TokenDetails: async (contractAddress: string) => {
            contractAddress;
            return {
              token: {
                balance: 65,
                decimals: BigInt(18),
                name: "POWERCOIN",
                symbol: "POW",
                totalSupply: 100000,
              },
              error: "",
            };
          },
        },
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("65.0 POW")).toBeInTheDocument();
      expect(screen.getByText("POWERCOIN")).toBeInTheDocument();
      const sendButton = screen.getByRole("button", { name: "POW" });
      expect(sendButton).toBeInTheDocument();
      expect(sendButton).toBeEnabled();
    });
  });
});
