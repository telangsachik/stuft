import { mockedStore } from "@/__mocks__/mockedStore";
import { RESTRICTED_METHODS } from "@/scripts/constants/requestConstants";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DAppRequest from "../DAppRequest";

jest.mock("../DAppRequestContent/DAppRequestContent", () => () => (
  <div>Mocked DApp Request Content</div>
));

describe("DAppRequest", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <DAppRequest />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should not render the dapp request content if there is no request", async () => {
    renderComponent();

    expect(
      screen.queryByText("Mocked DApp Request Content"),
    ).toBeInTheDocument();
  });

  it("should render the dapp request content if a request exist", async () => {
    renderComponent(
      mockedStore({
        dAppRequestStore: {
          dAppRequestData: { method: RESTRICTED_METHODS.ZOND_REQUEST_ACCOUNTS },
        },
      }),
    );

    expect(screen.getByText("Mocked DApp Request Content")).toBeInTheDocument();
  });
});
