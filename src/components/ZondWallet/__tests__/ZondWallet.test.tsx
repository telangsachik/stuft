import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { describe, expect, it, jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ZondWallet from "../ZondWallet";

jest.mock("@/components/ZondWallet/RouteMonitor/RouteMonitor", () => () => (
  <div>Mocked Route Monitor</div>
));
jest.mock("@/components/ZondWallet/Header/Header", () => () => (
  <div>Mocked Header</div>
));
jest.mock("@/components/ZondWallet/Body/Body", () => () => (
  <div>Mocked Body</div>
));

describe("ZondWallet", () => {
  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ZondWallet />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the route monitor, the header component and the body component", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Mocked Route Monitor")).toBeInTheDocument();
      expect(screen.getByText("Mocked Header")).toBeInTheDocument();
      expect(screen.getByText("Mocked Body")).toBeInTheDocument();
    });
  });
});
