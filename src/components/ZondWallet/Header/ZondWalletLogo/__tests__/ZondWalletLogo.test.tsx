import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ZondWalletLogo from "../ZondWalletLogo";

describe("ZondWalletLogo", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ZondWalletLogo />
      </MemoryRouter>,
    );

  it("should render the zond and wallet text in the component", () => {
    renderComponent();

    expect(screen.getByText("Zond")).toBeInTheDocument();
    expect(screen.getByText("Wallet")).toBeInTheDocument();
  });
});
