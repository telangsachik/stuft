import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AccountUnlock } from "../AccountUnlock";

describe("AccountUnlock", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <AccountUnlock />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the account unlock component", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          activeAccount: {
            accountAddress: "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1",
          },
        },
      }),
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Unlock 0x..093A1",
    );
    expect(
      screen.getByText("0x2090E9F38771876FB6Fc51a6b464121d3cC093A1"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Unlock" })).toBeInTheDocument();
  });

  it("should display the field error if password validation fails", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          activeAccount: {
            accountAddress: "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1",
          },
        },
      }),
    );

    const passwordField = screen.getByLabelText("password");
    await waitFor(() => {
      userEvent.type(passwordField, "te");
    });
    await waitFor(() => {
      expect(
        screen.getByText("Password should be atleast 8 characters"),
      ).toBeInTheDocument();
    });
  });

  it("should not display the field error if password validation succeeds", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          activeAccount: {
            accountAddress: "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1",
          },
        },
      }),
    );

    const passwordField = screen.getByLabelText("password");
    await waitFor(() => {
      userEvent.type(passwordField, "test123456");
    });
    await waitFor(() => {
      expect(
        screen.queryByText("Password should be atleast 8 characters"),
      ).not.toBeInTheDocument();
    });
  });

  it("should render the unlock button disabled if the password field is empty", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          activeAccount: {
            accountAddress: "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1",
          },
        },
      }),
    );

    const unlockButton = screen.getByRole("button", { name: "Unlock" });
    const passwordField = screen.getByLabelText("password");
    await waitFor(() => {
      userEvent.type(passwordField, "te");
    });
    await waitFor(() => {
      expect(unlockButton).toBeDisabled();
    });
  });

  it("should render the unlock button enabled if the password field is filled", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          activeAccount: {
            accountAddress: "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1",
          },
        },
      }),
    );

    const unlockButton = screen.getByRole("button", { name: "Unlock" });
    const passwordField = screen.getByLabelText("password");
    await waitFor(() => {
      userEvent.type(passwordField, "test123456");
    });
    await waitFor(() => {
      expect(unlockButton).toBeEnabled();
    });
  });
});
