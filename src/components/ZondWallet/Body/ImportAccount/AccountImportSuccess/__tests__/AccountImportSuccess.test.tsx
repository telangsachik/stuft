import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { Transaction } from "@theqrl/web3";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import AccountImportSuccess from "../AccountImportSuccess";

describe("AccountImportSuccess", () => {
  afterEach(cleanup);

  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof AccountImportSuccess> = {
      account: {
        address: "0x20fB08fF1f1376A14C055E9F56df80563E16722b",
        seed: "",
        sign: (data: string | Record<string, unknown>) => ({
          messageHash: data.toString(),
          signature: data.toString(),
        }),
        signTransaction: async (tx: Transaction) => ({
          messageHash: "",
          signature: "",
          rawTransaction: tx.value?.toString() ?? "",
          transactionHash: "",
        }),
      },
    },
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <AccountImportSuccess {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the required details about account import", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Account imported",
    );
    expect(
      screen.getByText("0x 20fB 08fF 1f13 76A1 4C05 5E9F 56df 8056 3E16 722b"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Your account is successfully imported."),
    ).toBeInTheDocument();
  });

  it("should render the copy button and the done button", () => {
    renderComponent();

    const copyButton = screen.getByRole("button", { name: "Copy" });
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toBeEnabled();

    const doneButton = screen.getByRole("button", { name: "Done" });
    expect(doneButton).toBeInTheDocument();
    expect(doneButton).toBeEnabled();
  });
});
