import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import DAppRequestFeature from "../DAppRequestFeature";

jest.mock("../EthRequestAccount/EthRequestAccount", () => () => (
  <div>Mocked Eth Request Account</div>
));

describe("DAppRequestFeature", () => {
  afterEach(cleanup);

  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof DAppRequestFeature> = {
      addToResponseData: () => {},
      dAppRequestData: {
        method: "zond_requestAccounts",
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
          <DAppRequestFeature {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the dapp request feature component, for zond_requestAccounts", () => {
    renderComponent(undefined, {
      addToResponseData: () => {},
      dAppRequestData: {
        method: "zond_requestAccounts",
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
    });

    expect(screen.getByText("Mocked Eth Request Account")).toBeInTheDocument();
  });

  it("should render the dapp request feature component, for some unknow method", () => {
    renderComponent(undefined, {
      addToResponseData: () => {},
      dAppRequestData: {
        method: "zond_mocked_method",
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
    });

    expect(
      screen.queryByText("Mocked Eth Request Account"),
    ).not.toBeInTheDocument();
  });
});
