import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ConnectionFailed from "../ConnectionFailed";

describe("ConnectionFailed", () => {
  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ConnectionFailed />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the connection failed component", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Connection failed",
    );
    expect(
      screen.getByText(
        "Please ensure that you are connected to the internet, and the blockchain is running.",
      ),
    ).toBeInTheDocument();
  });
});
