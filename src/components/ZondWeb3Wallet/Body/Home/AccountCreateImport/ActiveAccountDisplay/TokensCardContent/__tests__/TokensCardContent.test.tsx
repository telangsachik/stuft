import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TokensCardContent from "../TokensCardContent";

jest.mock("./../NativeToken/NativeToken", () => () => (
  <div>Mocked Native token</div>
));
jest.mock("./../ZRC20Tokens/ZRC20Tokens", () => () => (
  <div>Mocked ZRC 20 token</div>
));

describe("TokensCardContent", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <TokensCardContent />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the token card content component", () => {
    renderComponent();

    expect(screen.getByText("Mocked Native token")).toBeInTheDocument();
    expect(screen.getByText("Mocked ZRC 20 token")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Import token" }),
    ).toBeInTheDocument();
  });
});
