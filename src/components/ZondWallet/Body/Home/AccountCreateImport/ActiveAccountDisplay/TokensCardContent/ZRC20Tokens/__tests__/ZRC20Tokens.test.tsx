import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import ZRC20Tokens from "../ZRC20Tokens";

jest.mock("@/utilities/storageUtil", () => {
  const originalModule = jest.requireActual<
    typeof import("@/utilities/storageUtil")
  >("@/utilities/storageUtil");
  return {
    ...originalModule,
    getTokenContractsList: jest.fn(async () => [
      "0x28c4113a9d3a2e836f28c23ed8e3c1e7c243f566",
      "0x978918b7b544ad491d0b294cc6ac4d7bb0ef7112",
      "0x0db3981cb93db985e4e3a62ff695f7a1b242dd7c",
    ]),
  };
});

describe("ZRC20Tokens", () => {
  afterEach(cleanup);

  const renderComponent = (
    mockedStoreValues = mockedStore({
      zondStore: {
        getZrc20TokenDetails: async (contractAddress: string) => {
          const tokenContracts = {
            "0x28c4113a9d3a2e836f28c23ed8e3c1e7c243f566": {
              token: {
                balance: 12,
                decimals: BigInt(18),
                name: "COIN1",
                symbol: "CO1",
                totalSupply: 100000,
              },
              error: "",
            },
            "0x978918b7b544ad491d0b294cc6ac4d7bb0ef7112": {
              token: {
                balance: 56,
                decimals: BigInt(18),
                name: "COIN2",
                symbol: "CO2",
                totalSupply: 100000,
              },
              error: "",
            },
            "0x0db3981cb93db985e4e3a62ff695f7a1b242dd7c": {
              token: {
                balance: 96,
                decimals: BigInt(18),
                name: "COIN3",
                symbol: "CO3",
                totalSupply: 100,
              },
              error: "",
            },
          };
          return (
            tokenContracts[contractAddress as keyof typeof tokenContracts] ?? {}
          );
        },
      },
    }),
    mockedProps: ComponentProps<typeof ZRC20Tokens> = {},
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ZRC20Tokens {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should display all the tokens if shouldDisplayAllTokens is true ", async () => {
    renderComponent(undefined, { shouldDisplayAllTokens: true });

    await waitFor(() => {
      expect(screen.getByText("12.0 CO1")).toBeInTheDocument();
      expect(screen.getByText("COIN1")).toBeInTheDocument();
      const co1SendButton = screen.getByRole("button", { name: "CO1" });
      expect(co1SendButton).toBeInTheDocument();
      expect(co1SendButton).toBeEnabled();
      expect(screen.getByText("56.0 CO2")).toBeInTheDocument();
      expect(screen.getByText("COIN2")).toBeInTheDocument();
      const co2SendButton = screen.getByRole("button", { name: "CO2" });
      expect(co2SendButton).toBeInTheDocument();
      expect(co2SendButton).toBeEnabled();
      expect(screen.getByText("96.0 CO3")).toBeInTheDocument();
      expect(screen.getByText("COIN3")).toBeInTheDocument();
      const co3SendButton = screen.getByRole("button", { name: "CO3" });
      expect(co3SendButton).toBeInTheDocument();
      expect(co3SendButton).toBeEnabled();
    });
  });

  it("should display only 2 tokens if shouldDisplayAllTokens is false ", async () => {
    renderComponent(undefined, { shouldDisplayAllTokens: false });

    await waitFor(() => {
      expect(screen.getByText("12.0 CO1")).toBeInTheDocument();
      expect(screen.getByText("COIN1")).toBeInTheDocument();
      const co1SendButton = screen.getByRole("button", { name: "CO1" });
      expect(co1SendButton).toBeInTheDocument();
      expect(co1SendButton).toBeEnabled();
      expect(screen.getByText("56.0 CO2")).toBeInTheDocument();
      expect(screen.getByText("COIN2")).toBeInTheDocument();
      const co2SendButton = screen.getByRole("button", { name: "CO2" });
      expect(co2SendButton).toBeInTheDocument();
      expect(co2SendButton).toBeEnabled();
      expect(screen.queryByText("96.0 CO3")).not.toBeInTheDocument();
      expect(screen.queryByText("COIN3")).not.toBeInTheDocument();
      const co3SendButton = screen.queryByRole("button", { name: "CO3" });
      expect(co3SendButton).not.toBeInTheDocument();
    });
  });
});
