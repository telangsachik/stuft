import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AccountCreateImport from "../AccountCreateImport";

jest.mock("../ActiveAccountDisplay/ActiveAccountDisplay", () => () => (
  <div>Mocked Active Account Display</div>
));

describe("AccountCreateImport", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <AccountCreateImport />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the account create and import component when there are no active account", () => {
    renderComponent(
      mockedStore({ zondStore: { activeAccount: { accountAddress: "" } } }),
    );

    expect(screen.queryByText("Active account")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Send Quanta" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Let's start",
    );
    expect(screen.getByRole("paragraph")).toHaveTextContent(
      "You are connected to the blockchain. Create a new account or import an existing account.",
    );
    const createNewButton = screen.getByRole("button", {
      name: "Create a new account",
    });
    const importButton = screen.getByRole("button", {
      name: "Import an existing account",
    });
    expect(createNewButton).toBeInTheDocument();
    expect(createNewButton).toBeEnabled();
    expect(importButton).toBeInTheDocument();
    expect(importButton).toBeEnabled();
  });

  it("should render the active account component and the account create and import component when there is an active account", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          activeAccount: {
            accountAddress: "0x205046e6A6E159eD6ACedE46A36CAD6D449C80A1",
          },
        },
      }),
    );

    expect(screen.getAllByRole("heading", { level: 3 })[0]).toHaveTextContent(
      "Active account",
    );
    expect(
      screen.getByText("Mocked Active Account Display"),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })[1]).toHaveTextContent(
      "Tokens",
    );
    expect(screen.getAllByRole("heading", { level: 3 })[2]).toHaveTextContent(
      "Add accounts",
    );
    expect(screen.getByRole("paragraph")).toHaveTextContent(
      "You are connected to the blockchain. Create a new account or import an existing account.",
    );
    const sendQuantaButton = screen.getByRole("button", {
      name: "Send Quanta",
    });
    const createNewButton = screen.getByRole("button", {
      name: "Create a new account",
    });
    const importButton = screen.getByRole("button", {
      name: "Import an existing account",
    });
    expect(sendQuantaButton).toBeInTheDocument();
    expect(sendQuantaButton).toBeEnabled();
    expect(createNewButton).toBeInTheDocument();
    expect(createNewButton).toBeEnabled();
    expect(importButton).toBeInTheDocument();
    expect(importButton).toBeEnabled();
  });
});
