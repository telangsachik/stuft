import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import HexSeedListing from "../HexSeedListing";

describe("HexSeedListing", () => {
  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof HexSeedListing> = {
      hexSeed:
        "0xd6921377489c736691d06ad610f105a5207f3d47d20404766860b0e587928083e9ef5c13a3a5f37e76cc3cedb65a2101",
    },
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <HexSeedListing {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the hexseed listing component", () => {
    renderComponent();
    const expectedHexSeedSegments = [
      "0x",
      "d69",
      "213",
      "774",
      "89c",
      "736",
      "691",
      "d06",
      "ad6",
      "10f",
      "105",
      "a52",
      "07f",
      "3d4",
      "7d2",
      "040",
      "476",
      "686",
      "0b0",
      "e58",
      "792",
      "808",
      "3e9",
      "ef5",
      "c13",
      "a3a",
      "5f3",
      "7e7",
      "6cc",
      "3ce",
      "db6",
      "5a2",
      "101",
    ];

    expect(screen.getByText("Hex Seed")).toBeInTheDocument();
    expectedHexSeedSegments.forEach((segment) => {
      expect(screen.getByText(segment)).toBeInTheDocument();
    });
  });
});
