import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import DAppRequestWebsite from "../DAppRequestWebsite";

jest.mock("../DAppRequestFeature/DAppRequestFeature", () => () => (
  <div>Mocked DApp Request Feature</div>
));

describe("DAppRequestWebsite", () => {
  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof DAppRequestWebsite> = {
      addToResponseData: () => {},
      dAppRequestData: {
        method: "eth_requestAccounts",
        requestData: {
          senderData: {
            tabId: 1,
            title: "Mocked Page Title",
            url: "http://localhost/",
            favIconUrl: "http://localhost/mocked-fav-icon.svg",
          },
        },
      },
      decideCanProceed: () => {},
    },
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <DAppRequestWebsite {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the dapp request website component", () => {
    renderComponent();

    expect(screen.getByText("http://localhost/")).toBeInTheDocument();
    expect(screen.getByText("Mocked Page Title")).toBeInTheDocument();
    expect(screen.getByText("Mocked DApp Request Feature")).toBeInTheDocument();
  });
});
