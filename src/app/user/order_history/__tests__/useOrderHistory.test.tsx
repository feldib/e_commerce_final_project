import React from "react";
import { renderHook } from "@testing-library/react";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import useOrderHistory from "../useOrderHistory";

// Mock dependencies
jest.mock("@/hooks/useAxios", () => jest.fn(() => []));
jest.mock("@/hooks/useLoading", () =>
  jest.fn((data, renderFn) => renderFn(data))
);

const mockUserDataContext = {
  loggedIn: true,
  user: {
    id: 1,
    first_name: "Test",
    last_name: "User",
    email: "test@test.com",
    address: "Test Address",
    phone_number: "123456789",
    is_admin: false,
  },
  logOut: jest.fn(),
  settleSuccessfulLogIn: jest.fn(),
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider>
    <UserDataContext.Provider value={mockUserDataContext}>
      {children}
    </UserDataContext.Provider>
  </I18nProvider>
);

describe("useOrderHistory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return translation function and order history representation", () => {
    const { result } = renderHook(() => useOrderHistory(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.t).toBe("function");
    expect(result.current.ordersRepresented).toBeDefined();
  });

  it("should provide working translation function", () => {
    const { result } = renderHook(() => useOrderHistory(), {
      wrapper: TestWrapper,
    });

    const translationResult = result.current.t("test.key");
    expect(typeof translationResult).toBe("string");
  });
});
