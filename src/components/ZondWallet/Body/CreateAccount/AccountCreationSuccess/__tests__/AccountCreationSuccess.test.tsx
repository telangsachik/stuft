import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import {
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Web3BaseWalletAccount } from "@theqrl/web3";
import { MemoryRouter } from "react-router-dom";
import AccountCreationSuccess from "../AccountCreationSuccess";

describe("AccountCreationSuccess", () => {
  beforeAll(() => {
    jest.useFakeTimers({ advanceTimers: true });
  });
  afterEach(cleanup);

  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedAccount: Web3BaseWalletAccount = {
      address: "0x205046e6A6E159eD6ACedE46A36CAD6D449C80A1",
      seed: "",
      sign: (data: Record<string, unknown> | string) => {
        data;
        return { messageHash: "", signature: "", message: "" };
      },
      signTransaction: async () => ({
        messageHash: "",
        rawTransaction: "",
        signature: "",
        transactionHash: "",
      }),
    },
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <AccountCreationSuccess account={mockedAccount} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the account creation sucess component", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Account created",
    );
    expect(screen.getByText("Account public address:")).toBeInTheDocument();
    expect(
      screen.getByText("0x 2050 46e6 A6E1 59eD 6ACe dE46 A36C AD6D 449C 80A1"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "You can share this account public address with anyone. Others need it to interact with you.",
      ),
    ).toBeInTheDocument();
    const copyButton = screen.getByRole("button", { name: "Copy" });
    const doneButton = screen.getByRole("button", { name: "Done" });
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toBeEnabled();
    expect(doneButton).toBeInTheDocument();
    expect(doneButton).toBeEnabled();
  });

  it("should copy the account address to clipboard", async () => {
    renderComponent();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const clipboardMock = jest.fn().mockResolvedValue(void 0 as never);
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: clipboardMock,
      },
      writable: true,
    });
    const copyButton = screen.getByRole("button", { name: "Copy" });
    expect(screen.getByText("Copy")).toBeInTheDocument();
    await user.click(copyButton);
    expect(screen.getByText("Copied")).toBeInTheDocument();
    jest.advanceTimersByTime(1000);
    expect(clipboardMock).toHaveBeenCalledTimes(1);
    expect(clipboardMock).toHaveBeenCalledWith(
      "0x205046e6A6E159eD6ACedE46A36CAD6D449C80A1",
    );
  });
});
