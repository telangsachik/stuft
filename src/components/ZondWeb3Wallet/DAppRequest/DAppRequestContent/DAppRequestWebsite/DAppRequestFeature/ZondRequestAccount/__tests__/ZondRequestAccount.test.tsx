import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ZondRequestAccount from "../ZondRequestAccount";

describe("ZondRequestAccount", () => {
  afterEach(cleanup);

  const mockedAddToResponseData = jest.fn();
  const mockedSetCanProceed = jest.fn();

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ZondRequestAccount />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the zond request account component, with an account in zond store", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondAccounts: {
            isLoading: false,
            accounts: [
              {
                accountAddress: "Z20915094FEDE91EFAC68fD43D82e9Fff4daC7482",
                accountBalance: "10 ZND",
              },
            ],
          },
          getAccountBalance: () => "10.0 ZND",
        },
      }),
    );

    expect(screen.getByText("Connect with Wallet")).toBeInTheDocument();
    const checkBox = screen.getByRole("checkbox", {
      name: "Z 20915 094FE DE91E FAC68 fD43D 82e9F ff4da C7482 10.0 ZND",
    });
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Careful!",
    );
    expect(
      screen.getByText(
        "There are token approval scams out there. Ensure you only connect your wallet with the websites you trust.",
      ),
    ).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toBeEnabled();
    expect(screen.getByText("Z")).toBeInTheDocument();
    expect(screen.getByText("20915")).toBeInTheDocument();
    expect(screen.getByText("094FE")).toBeInTheDocument();
    expect(screen.getByText("DE91E")).toBeInTheDocument();
    expect(screen.getByText("FAC68")).toBeInTheDocument();
    expect(screen.getByText("fD43D")).toBeInTheDocument();
    expect(screen.getByText("82e9F")).toBeInTheDocument();
    expect(screen.getByText("ff4da")).toBeInTheDocument();
    expect(screen.getByText("C7482")).toBeInTheDocument();
    expect(
      screen.queryByText("Account not available to connect"),
    ).not.toBeInTheDocument();
  });

  it("should render the zond request account component, without an account in zond store", () => {
    renderComponent(
      mockedStore({
        zondStore: { zondAccounts: { isLoading: false, accounts: [] } },
      }),
    );

    const checkBox = screen.queryByRole("checkbox", {
      name: "Z 2090E 9F387 71876 FB6Fc 51a6b 46412 1d3cC 093A1",
    });
    expect(checkBox).not.toBeInTheDocument();
    expect(
      screen.getByText("No accounts available to connect"),
    ).toBeInTheDocument();
  });

  it("should call the addToResponseData and decideCanProceed functions on selecting the account", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondAccounts: {
            isLoading: false,
            accounts: [
              {
                accountAddress: "Z2090E9F38771876FB6Fc51a6b464121d3cC093A1",
                accountBalance: "10 ZND",
              },
            ],
          },
          getAccountBalance: () => "10.0 ZND",
        },
        dAppRequestStore: {
          addToResponseData: mockedAddToResponseData,
          setCanProceed: mockedSetCanProceed,
        },
      }),
    );

    expect(screen.getByText("Connect with Wallet")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Select the accounts you want this site to connect with",
      ),
    ).toBeInTheDocument();
    const checkBox = screen.getByRole("checkbox", {
      name: "Z 2090E 9F387 71876 FB6Fc 51a6b 46412 1d3cC 093A1 10.0 ZND",
    });
    await act(async () => {
      await userEvent.click(checkBox);
    });
    expect(mockedAddToResponseData).toHaveBeenCalledTimes(2);
    expect(mockedSetCanProceed).toHaveBeenCalledTimes(1);
  });
});
