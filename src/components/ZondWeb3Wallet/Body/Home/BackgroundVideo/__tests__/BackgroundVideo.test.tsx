import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BackgroundVideo from "../BackgroundVideo";

describe("BackgroundVideo", () => {
  afterEach(cleanup);

  const renderComponent = (mockedStoreValues = mockedStore()) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <BackgroundVideo />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should display the light background video when the light theme is applied", () => {
    const theme = "light";
    renderComponent(
      mockedStore({ settingsStore: { isDarkMode: false, theme } }),
    );

    const videoElement = screen.getByTestId("backgroundVideoTestId");
    const videoSource = videoElement.querySelector("source");
    expect(videoElement).toBeInTheDocument();
    expect(videoSource).toBeInTheDocument();
    expect(videoSource).toHaveAttribute("src", `qrl-video-${theme}.mp4`);
  });

  it("should display the dark background video when the dark theme is applied", () => {
    const theme = "dark";
    renderComponent(
      mockedStore({ settingsStore: { isDarkMode: true, theme } }),
    );

    const videoElement = screen.getByTestId("backgroundVideoTestId");
    const videoSource = videoElement.querySelector("source");
    expect(videoElement).toBeInTheDocument();
    expect(videoSource).toBeInTheDocument();
    expect(videoSource).toHaveAttribute("src", `qrl-video-${theme}.mp4`);
  });
});
