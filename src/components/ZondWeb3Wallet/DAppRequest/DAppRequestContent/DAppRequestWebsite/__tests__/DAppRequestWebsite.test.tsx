import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DAppRequestWebsite from "../DAppRequestWebsite";

jest.mock("../DAppRequestFeature/DAppRequestFeature", () => () => (
  <div>Mocked DApp Request Feature</div>
));

describe("DAppRequestWebsite", () => {
  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <DAppRequestWebsite />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the dapp request website component", () => {
    renderComponent();

    expect(screen.getByText("http://localhost")).toBeInTheDocument();
    expect(screen.getByText("Mocked Page Title")).toBeInTheDocument();
    expect(screen.getByText("Mocked DApp Request Feature")).toBeInTheDocument();
  });
});
