import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ZondWalletLogo from "../ZondWalletLogo";

jest.mock("@/router/router", () => ({
  ROUTES: { HOME: "/" },
}));

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
