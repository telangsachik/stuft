import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Body from "../Body";

jest.mock("react-router-dom", () => {
  const originalModule =
    jest.requireActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    Outlet: () => <div>Mocked Outlet</div>,
  };
});

describe("Body", () => {
  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <Body />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the router outlet in the body", () => {
    renderComponent();

    expect(screen.getByText("Mocked Outlet")).toBeInTheDocument();
  });
});
