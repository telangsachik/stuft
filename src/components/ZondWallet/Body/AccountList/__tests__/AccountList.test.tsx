import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AccountList from "../AccountList";

jest.mock(
  "@/components/ZondWallet/Body/AccountList/NewAccount/NewAccount",
  () => () => <div>Mocked New Account</div>,
);
jest.mock(
  "@/components/ZondWallet/Body/AccountList/ActiveAccount/ActiveAccount",
  () => () => <div>Mocked Active Account</div>,
);
jest.mock(
  "@/components/ZondWallet/Body/AccountList/OtherAccounts/OtherAccounts",
  () => () => <div>Mocked Other Account</div>,
);

describe("AccountList", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <AccountList />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the account list component", () => {
    renderComponent();

    expect(screen.getByText("Mocked New Account")).toBeInTheDocument();
    expect(screen.getByText("Mocked Active Account")).toBeInTheDocument();
    expect(screen.getByText("Mocked Other Account")).toBeInTheDocument();
  });
});
