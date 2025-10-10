import React from "react";
import { renderHook } from "@testing-library/react";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";

import useOrders from "../useOrders";

// Mock the useAxios hook
jest.mock("@/hooks/useAxios", () => jest.fn(() => []));

// Mock the useLoading hook
jest.mock("@/hooks/useLoading", () =>
  jest.fn((data, renderFn) => renderFn(data))
);

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider>{children}</I18nProvider>
);

describe("useOrders", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return translation function and orders representation", () => {
    const { result } = renderHook(() => useOrders(), { wrapper: TestWrapper });

    expect(typeof result.current.t).toBe("function");
    expect(result.current.ordersRepresented).toBeDefined();
  });

  it("should provide working translation function", () => {
    const { result } = renderHook(() => useOrders(), { wrapper: TestWrapper });

    const translationResult = result.current.t("test.key");
    expect(typeof translationResult).toBe("string");
  });
});
