import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NewAccount } from "../NewAccount";

describe("NewAccount", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the new account component", () => {
    renderComponent();

    expect(
      screen.getByRole("button", { name: "Create or import an account" }),
    ).toBeInTheDocument();
  });
});
