import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TokenListItem from "../TokenListItem";

describe("TokenListItem", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <TokenListItem
            balance="25 ZND"
            name="ZND TOKEN"
            symbol="ZND"
            contractAddress="0x0db3981cb93db985e4e3a62ff695f7a1b242dd7c"
            decimals={18}
            isZrc20Token={false}
          />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the token list item component", () => {
    renderComponent();

    expect(screen.getByText("25 ZND")).toBeInTheDocument();
    expect(screen.getByText("ZND TOKEN")).toBeInTheDocument();
    const sendButton = screen.getByRole("button", { name: "ZND" });
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toBeEnabled();
  });
});
