import { mockedStore } from "@/__mocks__/mockedStore";
import { RESTRICTED_METHODS } from "@/scripts/constants/requestConstants";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DAppRequestFeature from "../DAppRequestFeature";

jest.mock("../ZondRequestAccount/ZondRequestAccount", () => () => (
  <div>Mocked Zond Request Account</div>
));
jest.mock("../ZondSendTransaction/ZondSendTransaction", () => () => (
  <div>Mocked Zond Send Transaction</div>
));

describe("DAppRequestFeature", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <DAppRequestFeature />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the dapp request feature component, for zond_requestAccounts rpc call", () => {
    renderComponent(
      mockedStore({
        dAppRequestStore: {
          dAppRequestData: { method: RESTRICTED_METHODS.ZOND_REQUEST_ACCOUNTS },
        },
      }),
    );

    expect(screen.getByText("Mocked Zond Request Account")).toBeInTheDocument();
  });

  it("should render the dapp request feature component, for zond_sendTransaction rpc call", () => {
    renderComponent(
      mockedStore({
        dAppRequestStore: {
          dAppRequestData: { method: RESTRICTED_METHODS.ZOND_SEND_TRANSACTION },
        },
      }),
    );

    expect(
      screen.getByText("Mocked Zond Send Transaction"),
    ).toBeInTheDocument();
  });
});
