import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DAppRequestContent from "../DAppRequestContent";

describe("DAppRequestContent", () => {
  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <DAppRequestContent />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should display network not available if there is no connection", async () => {
    renderComponent(
      mockedStore({
        zondStore: { zondConnection: { isConnected: false } },
      }),
    );

    expect(screen.getByText("Connection not available!")).toBeInTheDocument();
  });

  it("should render the dapp request content component", async () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Local" })).toBeInTheDocument();
    expect(screen.getByText("Your permission required")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Here is a request coming in. Go through the details and decide if it needs to be allowed.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Do you trust and want to allow this?"),
    ).toBeInTheDocument();
    const noButton = screen.getByRole("button", { name: "No" });
    const yesButton = screen.getByRole("button", { name: "Yes" });
    expect(noButton).toBeInTheDocument();
    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeEnabled();
    expect(yesButton).toBeDisabled();
  });
});
