import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TokenDisplaySection from "../TokenDisplaySection";

describe("TokenDisplaySection", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <TokenDisplaySection
            tokenIcon="icon.png"
            tokenName="MOCK TOKEN"
            tokenSymbol="MCK"
          />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the token display section component", () => {
    renderComponent();

    expect(screen.getByText("MCK")).toBeInTheDocument();
    expect(screen.getByText("MOCK TOKEN")).toBeInTheDocument();
  });
});
