import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import MnemonicWordListing from "../MnemonicWordListing";

describe("MnemonicWordListing", () => {
  afterEach(cleanup);

  const mnemonicPhrases =
    "knight paddy action glow play chew lame mature sock ill deadly olive blink marble breach hey mile mature tacit mean polo crawl khaya stud number speed viking windy jump subtle mildew sewage";

  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof MnemonicWordListing> = {
      mnemonic: mnemonicPhrases,
    },
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <MnemonicWordListing {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the mnemonic word listing component", () => {
    renderComponent();

    expect(screen.getByText("Mnemonic Phrases")).toBeInTheDocument();
    const words = mnemonicPhrases.split(" ");
    for (let i = 0; i < 32; i++) {
      expect(screen.getByText(`${i + 1}. ${words[i]}`)).toBeInTheDocument();
    }
  });
});
