import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { describe, expect, it, jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DAppRequest from "../DAppRequest";

jest.mock("../DAppRequestWebsite/DAppRequestWebsite", () => () => (
  <div>Mocked DApp Request Website</div>
));
jest.mock("@/utilities/storageUtil", () => {
  const originalModule = jest.requireActual<
    typeof import("@/utilities/storageUtil")
  >("@/utilities/storageUtil");
  return {
    ...originalModule,
    getDAppRequestData: jest.fn(async () => ({
      method: "zond_requestAccounts",
      requestData: {
        senderData: {
          tabId: 1,
          title: "Mocked Page Title",
          url: "http://localhost/",
          favIconUrl: "http://localhost/mocked-fav-icon.svg",
        },
      },
    })),
  };
});

describe("DAppRequest", () => {
  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <DAppRequest />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the dapp request component", async () => {
    renderComponent();

    await waitFor(async () => {
      expect(
        screen.getByText("Checking for pending requests"),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("button", { name: "Zond Local Node" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Your permission required",
    );
    expect(
      screen.getByText(
        "Here is a request coming in. Go through the details and decide if it needs to be allowed.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Mocked DApp Request Website")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Careful!",
    );
    expect(
      screen.getByText(
        "There are token approval scams out there. Ensure you only connect your wallet with the websites you trust.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Do you want to allow this?")).toBeInTheDocument();
    const noButton = screen.getByRole("button", { name: "No" });
    const yesButton = screen.getByRole("button", { name: "Yes" });
    expect(noButton).toBeInTheDocument();
    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeEnabled();
    expect(yesButton).toBeDisabled();
  });
});
