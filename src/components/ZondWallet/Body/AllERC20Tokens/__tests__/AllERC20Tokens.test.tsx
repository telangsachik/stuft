import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AllERC20Tokens from "../AllERC20Tokens";

jest.mock(
  "../../Home/AccountCreateImport/ActiveAccountDisplay/TokensCardContent/ERC20Tokens/ERC20Tokens",
  () => () => <div>Mocked ERC 20 tokens</div>,
);

describe("AllERC20Tokens", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <AllERC20Tokens />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the all erc 20 tokens component", () => {
    renderComponent();

    expect(screen.getByText("All ERC 20 tokens")).toBeInTheDocument();
    expect(screen.getByText("Mocked ERC 20 tokens")).toBeInTheDocument();
  });
});
