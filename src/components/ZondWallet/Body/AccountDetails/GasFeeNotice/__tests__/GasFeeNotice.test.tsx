import { mockedStore } from "@/__mocks__/mockedStore";
import { StoreProvider } from "@/stores/store";
import { afterEach, describe, expect, it } from "@jest/globals";
import { act, cleanup, render, screen } from "@testing-library/react";
import {
  BlockNumberOrTag,
  DataFormat,
  DEFAULT_RETURN_FORMAT,
  NumberTypes,
  Transaction,
} from "@theqrl/web3";
import { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import { GasFeeNotice } from "../GasFeeNotice";

describe("GasFeeNotice", () => {
  afterEach(cleanup);

  const renderComponent = (
    mockedStoreValues = mockedStore(),
    mockedProps: ComponentProps<typeof GasFeeNotice> = {
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

  it("should display the estimated gas fee", async () => {
    renderComponent(
      mockedStore({
        zondStore: {
          zondInstance: {
            estimateGas: async <
              ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT,
            >(
              transaction: Transaction,
              blockNumber?: BlockNumberOrTag,
              returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
            ) => {
              transaction;
              blockNumber;
              returnFormat;
              return 24000000000 as NumberTypes[ReturnFormat["number"]];
            },
            getGasPrice: async <
              ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT,
            >(
              returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
            ) => {
              returnFormat;
              return 110000000 as NumberTypes[ReturnFormat["number"]];
            },
          },
        },
      }),
      {
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
});
