import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ActiveAccount from "../ActiveAccount";

jest.mock("../../AccountId/AccountId", () => () => <div>Mocked Active Id</div>);

describe("ActiveAccount", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <ActiveAccount />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the active account component", () => {
    renderComponent(
      mockedStore({
        zondStore: {
          activeAccount: {
            accountAddress: "0x20fB08fF1f1376A14C055E9F56df80563E16722b",
          },
        },
      }),
    );

    expect(screen.getByText("Active account")).toBeInTheDocument();
    expect(screen.getByText("Mocked Active Id")).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    const copyButton = buttons[0];
    const sendQuantaButton = buttons[1];
    expect(copyButton).toBeInTheDocument();
    expect(sendQuantaButton).toBeInTheDocument();
  });

  it("should call the copyAccount function on clicking the copy button", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          activeAccount: {
            accountAddress: "0x20fB08fF1f1376A14C055E9F56df80563E16722b",
          },
        },
      }),
    );

    const mockedWriteText = jest.fn();
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: mockedWriteText,
      },
      writable: true,
    });
    const copyButton = screen.getAllByRole("button")[0];
    expect(copyButton).toBeInTheDocument();
    await userEvent.click(copyButton);
    expect(mockedWriteText).toBeCalledTimes(1);
    expect(mockedWriteText).toBeCalledWith(
      "0x20fB08fF1f1376A14C055E9F56df80563E16722b",
    );
  });
});
