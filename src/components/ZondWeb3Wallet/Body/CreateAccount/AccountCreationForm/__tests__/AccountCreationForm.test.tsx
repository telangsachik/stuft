import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AccountCreationForm from "../AccountCreationForm";

describe("AccountCreationForm", () => {
  afterEach(cleanup);

  const mockedOnAccountCreated = jest.fn();
  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <AccountCreationForm onAccountCreated={mockedOnAccountCreated} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the account creation form", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Create new account",
    );
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByLabelText("reEnteredPassword")).toBeInTheDocument();
    expect(screen.getByText("Enter a password")).toBeInTheDocument();
    expect(screen.getByText("Re-enter the password")).toBeInTheDocument();
    const createAccountButton = screen.getByRole("button");
    expect(createAccountButton).toBeInTheDocument();
  });

  it("should display the error message if the entered password length is less than 8", async () => {
    renderComponent();

    const passwordField = screen.getByLabelText("password");
    await waitFor(async () => {
      await userEvent.type(passwordField, "test123");
    });
    expect(
      screen.getByText("Password must be atleast 8 characters"),
    ).toBeInTheDocument();
  });

  it("should not display the error message if the entered password length is greater than or equal to 8", async () => {
    renderComponent();

    const passwordField = screen.getByLabelText("password");
    await waitFor(async () => {
      await userEvent.type(passwordField, "test1234");
    });
    expect(
      screen.queryByText("Password must be atleast 8 characters"),
    ).not.toBeInTheDocument();
  });

  it("should display the error message if the entered password and re-entered passwords doesn't match", async () => {
    renderComponent();

    const passwordField = screen.getByLabelText("password");
    const reEnteredPasswordField = screen.getByLabelText("reEnteredPassword");
    await waitFor(async () => {
      await userEvent.type(passwordField, "test123456");
      await userEvent.type(reEnteredPasswordField, "twst123456");
    });
    expect(
      screen.queryByText("Password must be atleast 8 characters"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Passwords doesn't match")).toBeInTheDocument();
  });

  it("should not display the error message if the entered password and re-entered passwords matches", async () => {
    renderComponent();

    const passwordField = screen.getByLabelText("password");
    const reEnteredPasswordField = screen.getByLabelText("reEnteredPassword");
    await waitFor(async () => {
      await userEvent.type(passwordField, "test123456");
      await userEvent.type(reEnteredPasswordField, "test123456");
    });
    expect(
      screen.queryByText("Password must be atleast 8 characters"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Passwords doesn't match"),
    ).not.toBeInTheDocument();
  });

  it("should call the onclick handler on clicking create account button", async () => {
    renderComponent();

    const passwordField = screen.getByLabelText("password");
    const reEnteredPasswordField = screen.getByLabelText("reEnteredPassword");
    const createAccountButton = screen.getByRole("button", {
      name: "Create account",
    });
    await waitFor(async () => {
      await userEvent.type(passwordField, "test123456");
      await userEvent.type(reEnteredPasswordField, "test123456");
      await userEvent.click(createAccountButton);
    });
    expect(mockedOnAccountCreated).toHaveBeenCalledTimes(1);
  });
});
