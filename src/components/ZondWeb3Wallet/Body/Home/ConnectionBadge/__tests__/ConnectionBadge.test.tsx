import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
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
            blockchain: "LOCAL",
          },
        },
      }),
    );

    expect(screen.getByRole("button", { name: "Local" })).toBeInTheDocument();
  });

  it("should display the testnet name if the network selected is testnet", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            blockchain: "TEST_NET",
          },
        },
      }),
    );

    expect(screen.getByRole("button", { name: "Testnet" })).toBeInTheDocument();
  });

  it("should display the mainnet name if the network selected is mainnet", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            blockchain: "MAIN_NET",
          },
        },
      }),
    );

    expect(screen.getByRole("button", { name: "Mainnet" })).toBeInTheDocument();
  });

  it("should display the network selection popup on clicking the network badge button", async () => {
    renderComponent();
    document.body.style.pointerEvents = "auto";
    const connectionBadge = screen.getByRole("button", {
      name: "Local",
    });

    await userEvent.click(connectionBadge);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Select Blockchain",
    );
    expect(
      screen.getByText(
        "Connect to a locally running zond blockchain node. You should have a blockchain running in your machine.",
      ),
    ).toBeInTheDocument();
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const connectButton = screen.getByRole("button", { name: "Connect" });
    expect(cancelButton).toBeInTheDocument();
    expect(connectButton).toBeInTheDocument();
    expect(cancelButton).toBeEnabled();
    expect(connectButton).toBeEnabled();
  });

  it("should display the network selection popup content for test network", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            blockchain: "TEST_NET",
          },
        },
      }),
    );
    document.body.style.pointerEvents = "auto";
    const connectionBadge = screen.getByRole("button", {
      name: "Testnet",
    });
    await userEvent.click(connectionBadge);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Select Blockchain",
    );
    expect(
      screen.getByText(
        "Connect to the zond testnet. Specify the IP address and port number of the testnet.",
      ),
    ).toBeInTheDocument();
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const connectButton = screen.getByRole("button", { name: "Connect" });
    expect(cancelButton).toBeInTheDocument();
    expect(connectButton).toBeInTheDocument();
    expect(cancelButton).toBeEnabled();
    expect(connectButton).toBeEnabled();
  });

  it("should display the network selection popup content for main network", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            blockchain: "MAIN_NET",
          },
        },
      }),
    );
    document.body.style.pointerEvents = "auto";
    const connectionBadge = screen.getByRole("button", {
      name: "Mainnet",
    });
    await userEvent.click(connectionBadge);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Select Blockchain",
    );
    expect(
      screen.getByText(
        "Connect to the zond mainnet. The real zond blockchain network.",
      ),
    ).toBeInTheDocument();
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const connectButton = screen.getByRole("button", { name: "Connect" });
    expect(cancelButton).toBeInTheDocument();
    expect(connectButton).toBeInTheDocument();
    expect(cancelButton).toBeEnabled();
    expect(connectButton).toBeEnabled();
  });

  it("should enable the connect button if form is valid for local network", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            blockchain: "LOCAL",
          },
        },
      }),
    );
    document.body.style.pointerEvents = "auto";
    const connectionBadge = screen.getByRole("button", {
      name: "Local",
    });
    await userEvent.click(connectionBadge);
    const ipAddressField = screen.getByLabelText("ipAddress");
    await userEvent.clear(ipAddressField);
    const portField = screen.getByLabelText("port");
    await userEvent.clear(portField);
    const connectButton = screen.getByRole("button", { name: "Connect" });
    expect(connectButton).toBeInTheDocument();
    expect(connectButton).toBeDisabled();
    await userEvent.type(ipAddressField, "http://127.0.0.1");
    await userEvent.type(portField, "3272");
    expect(connectButton).toBeEnabled();
  });

  it("should enable the connect button if form is valid for testnet network", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            blockchain: "TEST_NET",
          },
        },
      }),
    );
    document.body.style.pointerEvents = "auto";
    const connectionBadge = screen.getByRole("button", {
      name: "Testnet",
    });
    await userEvent.click(connectionBadge);
    const ipAddressField = screen.getByLabelText("ipAddress");
    await userEvent.clear(ipAddressField);
    const portField = screen.getByLabelText("port");
    await userEvent.clear(portField);
    const connectButton = screen.getByRole("button", { name: "Connect" });
    expect(connectButton).toBeInTheDocument();
    expect(connectButton).toBeDisabled();
    await userEvent.type(ipAddressField, "http://255.245.3.3");
    await userEvent.type(portField, "3334");
    expect(connectButton).toBeEnabled();
  });

  it("should enable the connect button if form is valid for mainnet network", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            blockchain: "MAIN_NET",
          },
        },
      }),
    );
    document.body.style.pointerEvents = "auto";
    const connectionBadge = screen.getByRole("button", {
      name: "Mainnet",
    });
    await userEvent.click(connectionBadge);
    const ipAddressField = screen.queryByLabelText("ipAddress");
    expect(ipAddressField).not.toBeInTheDocument();
    const portField = screen.queryByLabelText("port");
    expect(portField).not.toBeInTheDocument();
    const connectButton = screen.getByRole("button", { name: "Connect" });
    expect(connectButton).toBeInTheDocument();
    expect(connectButton).toBeEnabled();
  });

  it("should invoke the selectBlockchain method on clicking the connect button", async () => {
    const mockedSelectBlockchain = jest.fn(async () => {});
    renderComponent(
      mockedStore({
        zondStore: {
          zondConnection: {
            blockchain: "MAIN_NET",
          },
          selectBlockchain: mockedSelectBlockchain,
        },
      }),
    );
    document.body.style.pointerEvents = "auto";
    const connectionBadge = screen.getByRole("button", { name: "Mainnet" });
    await userEvent.click(connectionBadge);
    const connectButton = await screen.findByRole("button", {
      name: "Connect",
    });
    mockedSelectBlockchain.mockClear();
    await userEvent.click(connectButton);

    expect(mockedSelectBlockchain).toHaveBeenCalledTimes(1);
  });
});
