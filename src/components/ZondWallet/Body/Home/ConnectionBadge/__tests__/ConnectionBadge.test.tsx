import { mockedStore } from "@/__mocks__/mockedStore";
import { ZOND_PROVIDER } from "@/configuration/zondConfig";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ConnectionBadge from "../ConnectionBadge";

describe("ConnectionBadge", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ConnectionBadge />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should display the local node name if the network selected is local", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            zondNetworkName: ZOND_PROVIDER.DEV.name,
          },
        },
      }),
    );

    expect(
      screen.getByRole("button", { name: "Zond Local Node" }),
    ).toBeInTheDocument();
  });

  it("should display the testnet name if the network selected is testnet", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            zondNetworkName: ZOND_PROVIDER.TEST_NET.name,
          },
        },
      }),
    );

    expect(
      screen.getByRole("button", { name: "Zond Testnet" }),
    ).toBeInTheDocument();
  });

  it("should display the mainnet name if the network selected is mainnet", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            zondNetworkName: ZOND_PROVIDER.MAIN_NET.name,
          },
        },
      }),
    );

    expect(
      screen.getByRole("button", { name: "Zond Mainnet" }),
    ).toBeInTheDocument();
  });

  it("should display the network selection popup on clicking the network badge button", async () => {
    renderComponent();
    document.body.style.pointerEvents = "auto";
    const connectionBadge = screen.getByRole("button", {
      name: "Zond Local Node",
    });

    await waitFor(() => {
      userEvent.click(connectionBadge);
    });

    await waitFor(() => {
      expect(screen.getByText("Blockchain network")).toBeInTheDocument();
      expect(screen.getAllByText("Zond Local Node")[1]).toBeInTheDocument();
      expect(screen.getByText("Zond Testnet")).toBeInTheDocument();
      expect(screen.getByText("Zond Mainnet")).toBeInTheDocument();
    });
  });
});
