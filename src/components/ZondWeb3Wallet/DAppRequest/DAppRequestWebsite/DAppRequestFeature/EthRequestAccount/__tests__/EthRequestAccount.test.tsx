import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import EthRequestAccount from "../EthRequestAccount";

describe("EthRequestAccount", () => {
  afterEach(cleanup);

  const mockedAddToResponseData = jest.fn();
  const mockedDecideCanProceed = jest.fn();

  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof EthRequestAccount> = {
      addToResponseData: mockedAddToResponseData,
      decideCanProceed: mockedDecideCanProceed,
    },
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <EthRequestAccount {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the eth request account component, with an account in zond store", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondAccounts: {
            isLoading: false,
            accounts: [
              {
                accountAddress: "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1",
                accountBalance: "10",
              },
            ],
          },
        },
      }),
    );

    expect(
      screen.getByText("Connect your zond web3 wallet accounts"),
    ).toBeInTheDocument();
    const checkBox = screen.getByRole("checkbox", {
      name: "0x 2090E 9F387 71876 FB6Fc 51a6b 46412 1d3cC 093A1",
    });
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toBeEnabled();
    expect(screen.getByText("0x")).toBeInTheDocument();
    expect(screen.getByText("2090E")).toBeInTheDocument();
    expect(screen.getByText("9F387")).toBeInTheDocument();
    expect(screen.getByText("71876")).toBeInTheDocument();
    expect(screen.getByText("FB6Fc")).toBeInTheDocument();
    expect(screen.getByText("51a6b")).toBeInTheDocument();
    expect(screen.getByText("46412")).toBeInTheDocument();
    expect(screen.getByText("1d3cC")).toBeInTheDocument();
    expect(screen.getByText("093A1")).toBeInTheDocument();
    expect(
      screen.queryByText("Account not available to connect"),
    ).not.toBeInTheDocument();
  });

  it("should render the eth request account component, without an account in zond store", () => {
    renderComponent(
      mockedStore({
        zondStore: { zondAccounts: { isLoading: false, accounts: [] } },
      }),
    );

    const checkBox = screen.queryByRole("checkbox", {
      name: "0x 2090E 9F387 71876 FB6Fc 51a6b 46412 1d3cC 093A1",
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
                accountAddress: "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1",
                accountBalance: "10",
              },
            ],
          },
        },
      }),
    );

    expect(
      screen.getByText("Connect your zond web3 wallet accounts"),
    ).toBeInTheDocument();
    const checkBox = screen.getByRole("checkbox", {
      name: "0x 2090E 9F387 71876 FB6Fc 51a6b 46412 1d3cC 093A1",
    });
    await act(async () => {
      await userEvent.click(checkBox);
    });
    expect(mockedAddToResponseData).toHaveBeenCalledTimes(2);
    expect(mockedDecideCanProceed).toHaveBeenCalledTimes(1);
  });
});
