import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ZondWeb3WalletLogo from "../ZondWeb3WalletLogo";

describe("ZondWeb3WalletLogo", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ZondWeb3WalletLogo />
      </MemoryRouter>,
    );

  it("should render the zond and wallet text in the component", () => {
    renderComponent();

    expect(screen.getByText("Zond")).toBeInTheDocument();
    expect(screen.getByText("Wallet")).toBeInTheDocument();
  });
});
