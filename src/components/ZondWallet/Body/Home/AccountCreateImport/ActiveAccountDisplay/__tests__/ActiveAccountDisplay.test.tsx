import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ActiveAccountDisplay from "../ActiveAccountDisplay";

describe("ActiveAccountDisplay", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ActiveAccountDisplay />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the active account details", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          activeAccount: {
            accountAddress: "0x205046e6A6E159eD6ACedE46A36CAD6D449C80A1",
          },
          getAccountBalance: (accountAddress: string) => {
            accountAddress;
            return "2.45 QRL";
          },
        },
      }),
    );

    expect(screen.getByText("2.45 QRL")).toBeInTheDocument();
    expect(
      screen.getByText("0x 2050 46e6 A6E1 59eD 6ACe dE46 A36C AD6D 449C 80A1"),
    ).toBeInTheDocument();
  });
});
