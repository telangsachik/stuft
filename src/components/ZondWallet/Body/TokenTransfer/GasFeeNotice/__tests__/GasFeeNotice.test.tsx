import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { act, cleanup, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import { GasFeeNotice } from "../GasFeeNotice";

describe("GasFeeNotice", () => {
  afterEach(cleanup);

  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof GasFeeNotice> = {
      isZrc20Token: false,
      tokenContractAddress: "",
      tokenDecimals: 18,
      isSubmitting: false,
      from: "",
      to: "",
      value: 1.5,
    },
  ) =>
    render(
      <StoreProvider value={mockedStoreValues}>
        <MemoryRouter>
          <GasFeeNotice {...mockedProps} />
        </MemoryRouter>
      </StoreProvider>,
    );

  it("should render the gas fee notice component", async () => {
    renderComponent(undefined, {
      isZrc20Token: false,
      tokenContractAddress: "",
      tokenDecimals: 18,
      isSubmitting: false,
      from: "0x205046e6A6E159eD6ACedE46A36CAD6D449C80A1",
      to: "0x20fB08fF1f1376A14C055E9F56df80563E16722b",
      value: 0.45,
    });

    await act(async () => {
      expect(screen.getByText("Estimating gas fee")).toBeInTheDocument();
    });
    expect(
      screen.getByText("Estimated gas fee is 0.0 QRL"),
    ).toBeInTheDocument();
  });

  it("should not render the gas fee notice component if value, to or from are not available", () => {
    renderComponent();

    expect(screen.queryByText("Estimating gas fee")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Estimated gas fee is 0.0000 QRL"),
    ).not.toBeInTheDocument();
  });

  it("should display the estimated gas fee for native token", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          getNativeTokenGas: jest.fn(async () => {
            return "2.64";
          }),
        },
      }),
      {
        isZrc20Token: false,
        tokenContractAddress: "",
        tokenDecimals: 18,
        isSubmitting: false,
        from: "0x205046e6A6E159eD6ACedE46A36CAD6D449C80A1",
        to: "0x20fB08fF1f1376A14C055E9F56df80563E16722b",
        value: 1.45,
      },
    );

    await act(async () => {
      expect(screen.getByText("Estimating gas fee")).toBeInTheDocument();
    });
    expect(
      screen.getByText("Estimated gas fee is 2.64 QRL"),
    ).toBeInTheDocument();
  });

  it("should display the estimated gas fee for ZRC 20 token", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          getZrc20TokenGas: jest.fn(
            async (
              from: string,
              to: string,
              value: number,
              contractAddress: string,
              decimals: number,
            ) => {
              from;
              to;
              value;
              contractAddress;
              decimals;
              return "5.2564854";
            },
          ),
        },
      }),
      {
        isZrc20Token: true,
        tokenContractAddress: "0x28c4113a9d3a2e836f28c23ed8e3c1e7c243f566",
        tokenDecimals: 18,
        isSubmitting: false,
        from: "0x205046e6A6E159eD6ACedE46A36CAD6D449C80A1",
        to: "0x20fB08fF1f1376A14C055E9F56df80563E16722b",
        value: 1.45,
      },
    );

    await act(async () => {
      expect(screen.getByText("Estimating gas fee")).toBeInTheDocument();
    });
    expect(
      screen.getByText("Estimated gas fee is 5.2564 QRL"),
    ).toBeInTheDocument();
  });
});
