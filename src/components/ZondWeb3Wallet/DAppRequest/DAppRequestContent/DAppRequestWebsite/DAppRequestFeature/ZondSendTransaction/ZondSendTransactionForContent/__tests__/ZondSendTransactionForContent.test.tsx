import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import { SEND_TRANSACTION_TYPES } from "../../ZondSendTransaction";
import ZondSendTransactionForContent from "../ZondSendTransactionForContent";

describe("ZondSendTransactionForContent", () => {
  afterEach(cleanup);

  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof ZondSendTransactionForContent> = {
      transactionType: SEND_TRANSACTION_TYPES.UNKNOWN,
    },
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ZondSendTransactionForContent {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the zond send transaction component for contract deployment", async () => {
    const requestForContractDeployment = {
      data: "0x6080604052348015600e575f5ffd5b506101298061001c5f395ff3fe6080604052348015600e575f5ffd5b50600436106030575f3560e01c8063271f88b4146034578063d321fe2914604c575b5f5ffd5b604a60048036038101906046919060a9565b6066565b005b6052606f565b604051605d919060dc565b60405180910390f35b805f8190555050565b5f5f54905090565b5f5ffd5b5f819050919050565b608b81607b565b81146094575f5ffd5b50565b5f8135905060a3816084565b92915050565b5f6020828403121560bb5760ba6077565b5b5f60c6848285016097565b91505092915050565b60d681607b565b82525050565b5f60208201905060ed5f83018460cf565b9291505056fea26469706673582212203f5c1f328bda9fceed794ae68885d6664554bf4d7dbb1df839cc372d276837ab64736f6c634300081b0033",
      from: "Z20D20b8026B8F02540246f58120ddAAf35AECD9B",
      gas: "0x1cbb3",
      type: "0x2",
      value: "0x0",
    };
    renderComponent(
      mockedStore({
        dAppRequestStore: {
          dAppRequestData: {
            params: [requestForContractDeployment],
          },
        },
      }),
      { transactionType: SEND_TRANSACTION_TYPES.CONTRACT_DEPLOYMENT },
    );

    const detailsTab = screen.getByRole("tab", { name: "Details" });
    const dataTab = screen.getByRole("tab", { name: "Data" });
    expect(detailsTab).toBeInTheDocument();
    expect(dataTab).toBeInTheDocument();
    expect(screen.getByText("From address")).toBeInTheDocument();
    expect(
      screen.getByText("Z 20D20 b8026 B8F02 54024 6f581 20ddA Af35A ECD9B"),
    ).toBeInTheDocument();
    expect(screen.getByText("Gas Limit")).toBeInTheDocument();
    expect(screen.getByText("117683")).toBeInTheDocument();
    expect(screen.getByText("Mnemonic phrases")).toBeInTheDocument();
    const mnemonicPhrasesField = screen.getByRole("textbox", {
      name: "mnemonicPhrases",
    });
    expect(mnemonicPhrasesField).toBeInTheDocument();
    expect(screen.getByText("Paste the mnemonic phrases")).toBeInTheDocument();
    await userEvent.click(dataTab);
    expect(
      screen.getByText(
        "0x6080604052348015600e575f5ffd5b506101298061001c5f395ff3fe6080604052348015600e575f5ffd5b50600436106030575f3560e01c8063271f88b4146034578063d321fe2914604c575b5f5ffd5b604a60048036038101906046919060a9565b6066565b005b6052606f565b604051605d919060dc565b60405180910390f35b805f8190555050565b5f5f54905090565b5f5ffd5b5f819050919050565b608b81607b565b81146094575f5ffd5b50565b5f8135905060a3816084565b92915050565b5f6020828403121560bb5760ba6077565b5b5f60c6848285016097565b91505092915050565b60d681607b565b82525050565b5f60208201905060ed5f83018460cf565b9291505056fea26469706673582212203f5c1f328bda9fceed794ae68885d6664554bf4d7dbb1df839cc372d276837ab64736f6c634300081b0033",
      ),
    ).toBeInTheDocument();
  });

  it("should render the zond send transaction component for contract interaction", async () => {
    const requestForContractInteraction = {
      from: "Z20D20b8026B8F02540246f58120ddAAf35AECD9B",
      to: "0x20EE9760786AD48aB90E326c5cd78c6269Ba10AB",
      data: "0x6080604052348015600e575f5ffd5b506101298061001c5f395ff3fe6080604052348015600e575f5ffd5b50600436106030575f3560e01c8063271f88b4146034578063d321fe2914604c575b5f5ffd5b604a60048036038101906046919060a9565b6066565b005b6052606f565b604051605d919060dc565b60405180910390f35b805f8190555050565b5f5f54905090565b5f5ffd5b5f819050919050565b608b81607b565b81146094575f5ffd5b50565b5f8135905060a3816084565b92915050565b5f6020828403121560bb5760ba6077565b5b5f60c6848285016097565b91505092915050565b60d681607b565b82525050565b5f60208201905060ed5f83018460cf565b9291505056fea26469706673582212203f5c1f328bda9fceed794ae68885d6664554bf4d7dbb1df839cc372d276837ab64736f6c634300081b0033",
      value: "0x0",
      gas: "0x1cbb3",
      type: "0x2",
    };
    renderComponent(
      mockedStore({
        dAppRequestStore: {
          dAppRequestData: {
            params: [requestForContractInteraction],
          },
        },
      }),
      { transactionType: SEND_TRANSACTION_TYPES.CONTRACT_INTERACTION },
    );

    const detailsTab = screen.getByRole("tab", { name: "Details" });
    const dataTab = screen.getByRole("tab", { name: "Data" });
    expect(detailsTab).toBeInTheDocument();
    expect(dataTab).toBeInTheDocument();
    expect(screen.getByText("From address")).toBeInTheDocument();
    expect(
      screen.getByText("Z 20D20 b8026 B8F02 54024 6f581 20ddA Af35A ECD9B"),
    ).toBeInTheDocument();
    expect(screen.getByText("Gas Limit")).toBeInTheDocument();
    expect(screen.getByText("117683")).toBeInTheDocument();
    expect(screen.getByText("Mnemonic phrases")).toBeInTheDocument();
    const mnemonicPhrasesField = screen.getByRole("textbox", {
      name: "mnemonicPhrases",
    });
    expect(mnemonicPhrasesField).toBeInTheDocument();
    expect(screen.getByText("Paste the mnemonic phrases")).toBeInTheDocument();
    await userEvent.click(dataTab);
    expect(
      screen.getByText(
        "0x6080604052348015600e575f5ffd5b506101298061001c5f395ff3fe6080604052348015600e575f5ffd5b50600436106030575f3560e01c8063271f88b4146034578063d321fe2914604c575b5f5ffd5b604a60048036038101906046919060a9565b6066565b005b6052606f565b604051605d919060dc565b60405180910390f35b805f8190555050565b5f5f54905090565b5f5ffd5b5f819050919050565b608b81607b565b81146094575f5ffd5b50565b5f8135905060a3816084565b92915050565b5f6020828403121560bb5760ba6077565b5b5f60c6848285016097565b91505092915050565b60d681607b565b82525050565b5f60208201905060ed5f83018460cf565b9291505056fea26469706673582212203f5c1f328bda9fceed794ae68885d6664554bf4d7dbb1df839cc372d276837ab64736f6c634300081b0033",
      ),
    ).toBeInTheDocument();
  });

  it("should render the zond send transaction component for ZND transfer", async () => {
    const requestForZndTransfer = {
      from: "Z20D20b8026B8F02540246f58120ddAAf35AECD9B",
      to: "Z20EE9760786AD48aB90E326c5cd78c6269Ba10AB",
      value: "0x30",
      gas: "0x1cb55",
      type: "0x2",
    };
    renderComponent(
      mockedStore({
        dAppRequestStore: {
          dAppRequestData: {
            params: [requestForZndTransfer],
          },
        },
      }),
      { transactionType: SEND_TRANSACTION_TYPES.ZND_TRANSFER },
    );

    const detailsTab = screen.getByRole("tab", { name: "Details" });
    const dataTab = screen.queryByRole("tab", { name: "Data" });
    expect(detailsTab).toBeInTheDocument();
    expect(dataTab).not.toBeInTheDocument();
    expect(screen.getByText("From address")).toBeInTheDocument();
    expect(
      screen.getByText("Z 20D20 b8026 B8F02 54024 6f581 20ddA Af35A ECD9B"),
    ).toBeInTheDocument();
    expect(screen.getByText("To address")).toBeInTheDocument();
    expect(
      screen.getByText("Z 20EE9 76078 6AD48 aB90E 326c5 cd78c 6269B a10AB"),
    ).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByText("48")).toBeInTheDocument();
    expect(screen.getByText("Gas Limit")).toBeInTheDocument();
    expect(screen.getByText("117589")).toBeInTheDocument();
    expect(screen.getByText("Mnemonic phrases")).toBeInTheDocument();
    const mnemonicPhrasesField = screen.getByRole("textbox", {
      name: "mnemonicPhrases",
    });
    expect(mnemonicPhrasesField).toBeInTheDocument();
    expect(screen.getByText("Paste the mnemonic phrases")).toBeInTheDocument();
  });
});
