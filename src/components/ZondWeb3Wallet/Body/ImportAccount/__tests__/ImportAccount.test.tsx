import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Transaction } from "@theqrl/web3";
import { MemoryRouter } from "react-router-dom";
import ImportAccount from "../ImportAccount";

jest.mock(
  "@/components/ZondWeb3Wallet/Body/ImportAccount/AccountImportSuccess/AccountImportSuccess",
  () => () => <div>Mocked Account Import Success</div>,
);

describe("ImportAccount", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ImportAccount />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the import account component with field and button", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Import an existing account",
      );
      expect(
        screen.getByRole("textbox", { name: "mnemonicPhrases" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("paragraph")).toHaveTextContent(
        "Paste the mnemonic phrases",
      );
      expect(
        screen.getByPlaceholderText("Mnemonic Phrases"),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Import account" }),
      ).toBeInTheDocument();
    });
  });

  it("should render the import account button disabled initially and should be enabled when the input is entered", async () => {
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Import account" }),
      ).toBeDisabled();
    });
    await userEvent.type(
      screen.getByRole("textbox", { name: "mnemonicPhrases" }),
      "knight paddy india glow play chew lame mature sock ill deadly olive blink marble breach hey mile mature tacit mean polo crawl khaya stud number speed viking windy jump subtle mildew sewage",
    );
    expect(
      screen.getByRole("button", { name: "Import account" }),
    ).toBeEnabled();
  });

  it("should call the submit callback on clicking the import account button", async () => {
    renderComponent();

    const handleOnSubmitMock = jest.fn();
    await waitFor(async () => {
      await userEvent.type(
        screen.getByRole("textbox", { name: "mnemonicPhrases" }),
        "knight paddy india glow play chew lame mature sock ill deadly olive blink marble breach hey mile mature tacit mean polo crawl khaya stud number speed viking windy jump subtle mildew sewage",
      );
      screen.getByRole("form", { name: "importAccount" }).onsubmit =
        handleOnSubmitMock;
      const button = screen.getByRole("button", { name: "Import account" });
      await userEvent.click(button);
    });
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);
  });

  it("should display the account import success component on successful submit", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondInstance: {
            accounts: {
              seedToAccount: (seed: string | Uint8Array) => {
                seed;
                return {
                  address: "0x2090E9F38771876FB6Fc51a6b464121d3cC093A1",
                  seed: "",
                  sign: (data: string | Record<string, unknown>) => {
                    data;
                    return { messageHash: "", signature: "" };
                  },
                  signTransaction: async (tx: Transaction) => {
                    tx;
                    return {
                      messageHash: "",
                      rawTransaction: "",
                      signature: "",
                      transactionHash: "",
                    };
                  },
                };
              },
            },
          },
        },
      }),
    );

    const handleOnSubmitMock = jest.fn();
    await waitFor(async () => {
      await userEvent.type(
        screen.getByRole("textbox", { name: "mnemonicPhrases" }),
        "knight paddy india glow play chew lame mature sock ill deadly olive blink marble breach hey mile mature tacit mean polo crawl khaya stud number speed viking windy jump subtle mildew sewage",
      );
      screen.getByRole("form", { name: "importAccount" }).onsubmit =
        handleOnSubmitMock;
      const button = screen.getByRole("button", { name: "Import account" });
      await userEvent.click(button);
    });
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText("Mocked Account Import Success"),
    ).toBeInTheDocument();
  });
});
