import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ImportToken from "../ImportToken";

describe("ImportToken", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ImportToken />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the import token component", () => {
    renderComponent();

    expect(screen.getByText("Import token")).toBeInTheDocument();
    expect(
      screen.getByText("Paste the token's contract address"),
    ).toBeInTheDocument();
    const inputField = screen.getByRole("textbox", { name: "contractAddress" });
    expect(inputField).toBeInTheDocument();
    const fetchTokenButton = screen.getByRole("button", {
      name: "Fetch token details",
    });
    expect(fetchTokenButton).toBeInTheDocument();
    expect(fetchTokenButton).toBeDisabled();
  });

  it("should enable the fetch token button in the component after entering token contract address", async () => {
    renderComponent();

    const inputField = screen.getByRole("textbox", { name: "contractAddress" });
    const fetchTokenButton = screen.getByRole("button", {
      name: "Fetch token details",
    });
    await userEvent.type(
      inputField,
      "0x0db3981cb93db985e4e3a62ff695f7a1b242dd7c",
    );
    expect(fetchTokenButton).toBeEnabled();
  });
});
