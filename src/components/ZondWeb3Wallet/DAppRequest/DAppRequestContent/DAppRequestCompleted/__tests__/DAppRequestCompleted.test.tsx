import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DAppRequestCompleted from "../DAppRequestCompleted";

describe("DAppRequestCompleted", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <DAppRequestCompleted />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the dapp request completed component for rejcted request", async () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Request rejected",
    );
    expect(
      screen.getByText("The request has been rejected"),
    ).toBeInTheDocument();
    const doneButton = screen.getByRole("button", { name: "Done" });
    expect(doneButton).toBeInTheDocument();
    expect(doneButton).toBeEnabled();
  });

  it("should render the dapp request completed component for approved request", async () => {
    renderComponent(
      mockedStore({
        dAppRequestStore: {
          approvalProcessingStatus: { hasApproved: true },
        },
      }),
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Request approved",
    );
    expect(
      screen.getByText("The request has been approved"),
    ).toBeInTheDocument();
    const doneButton = screen.getByRole("button", { name: "Done" });
    expect(doneButton).toBeInTheDocument();
    expect(doneButton).toBeEnabled();
  });
});
