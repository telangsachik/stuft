import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import { TransactionSuccessful } from "../TransactionSuccessful";

describe("TransactionSuccessful", () => {
  afterEach(cleanup);

  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof TransactionSuccessful> = {
      transactionReceipt: {
        transactionHash:
          "0x5e4c1bd1e00d229fe4d72d64df0b2f20b7649a9e0be00eff5353f1924af30e3c",
        transactionIndex: "",
        blockHash:
          "0x641dcb99dfcd2ad3c3e7c3d30090b274b788a0f29798d3c030aa24835c44b46d",
        blockNumber: BigInt(300504),
        from: "",
        to: "",
        cumulativeGasUsed: "",
        gasUsed: BigInt(21000),
        effectiveGasPrice: BigInt(21000),
        logs: [],
        logsBloom: "",
        root: "",
        status: "",
      },
    },
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <TransactionSuccessful {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the transaction successful component", async () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Transaction completed",
    );
    expect(screen.getByText("Transaction Hash")).toBeInTheDocument();
    expect(
      screen.getByText(
        "0x 5e4c 1bd1 e00d 229f e4d7 2d64 df0b 2f20 b764 9a9e 0be0 0eff 5353 f192 4af3 0e3c",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Block hash")).toBeInTheDocument();
    expect(
      screen.getByText(
        "0x 641d cb99 dfcd 2ad3 c3e7 c3d3 0090 b274 b788 a0f2 9798 d3c0 30aa 2483 5c44 b46d",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Block number")).toBeInTheDocument();
    expect(screen.getByText("300504")).toBeInTheDocument();
    expect(screen.getByText("Gas used")).toBeInTheDocument();
    expect(screen.getByText("0.000000000441 ZND")).toBeInTheDocument();
    const doneButton = screen.getByRole("button", { name: "Done" });
    expect(doneButton).toBeInTheDocument();
    expect(doneButton).toBeEnabled();
  });
});
