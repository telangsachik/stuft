import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import AccountId from "../AccountId";

describe("AccountId", () => {
  afterEach(cleanup);

  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof AccountId> = {
      account: "0x20fB08fF1f1376A14C055E9F56df80563E16722b",
    },
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <AccountId {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the account id component", () => {
    renderComponent();

    const addressSplit = [
      "0x",
      "20fB0",
      "8fF1f",
      "1376A",
      "14C05",
      "5E9F5",
      "6df80",
      "563E1",
      "6722b",
    ];
    for (const word of addressSplit) {
      expect(screen.getByText(word)).toBeInTheDocument();
    }
  });
});
