import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BackButton from "../BackButton";

const mockedNavigateFunction = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule =
    jest.requireActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockedNavigateFunction,
  };
});

describe("BackButton", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <BackButton />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the back button", () => {
    renderComponent();

    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("should call the navigate function to return back on clicking the button", async () => {
    renderComponent();

    const backButton = screen.getByTestId("backButtonTestId");
    await waitFor(() => {
      backButton.click();
    });
    expect(mockedNavigateFunction).toHaveBeenCalledTimes(1);
  });
});
