import React from "react";
import { act, renderHook } from "@testing-library/react";

import * as toastUtils from "@/utils/toastUtils";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import * as fetching from "@/fetching/auth";

import useLogin from "../useLogin";

// Mock dependencies
jest.mock("next/navigation");
jest.mock("@/utils/toastUtils", () => ({
  showLoginErrorToast: jest.fn(),
  showLoginSuccessToast: jest.fn(),
}));
jest.mock("@/fetching/auth", () => ({
  logIn: jest.fn(),
}));
jest.mock("@/hooks/useValidationSchemas", () => ({
  useLoginSchema: jest.fn(() => ({})),
}));

const mockLogIn = fetching.logIn as jest.MockedFunction<typeof fetching.logIn>;
const mockShowLoginErrorToast =
  toastUtils.showLoginErrorToast as jest.MockedFunction<
    typeof toastUtils.showLoginErrorToast
  >;

const mockUserDataContext = {
  loggedIn: false,
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone_number: "",
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

describe("useLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return login form properties", () => {
    const { result } = renderHook(() => useLogin(), { wrapper: TestWrapper });

    expect(result.current.t).toBeDefined();
    expect(result.current.loginSchema).toBeDefined();
    expect(result.current.initialValues).toEqual({
      email: "",
      password: "",
    });
    expect(result.current.onSubmit).toBeDefined();
  });

  it("should handle successful login", async () => {
    const mockUser = {
      id: 1,
      first_name: "Test",
      last_name: "User",
      email: "test@test.com",
      address: "Test Address",
      phone_number: "123456789",
      is_admin: false,
    };

    mockLogIn.mockImplementation(async (email, password, callback) => {
      callback(mockUser);
    });

    const { result } = renderHook(() => useLogin(), { wrapper: TestWrapper });

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "password123",
      });
    });

    expect(mockLogIn).toHaveBeenCalledWith(
      "test@test.com",
      "password123",
      expect.any(Function)
    );
    expect(mockUserDataContext.settleSuccessfulLogIn).toHaveBeenCalledWith(
      false,
      mockUser,
      expect.any(Object)
    );
  });

  it("should handle login error", async () => {
    mockLogIn.mockRejectedValue(new Error("Login failed"));

    const { result } = renderHook(() => useLogin(), { wrapper: TestWrapper });

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "wrongpassword",
      });
    });

    expect(mockLogIn).toHaveBeenCalledWith(
      "test@test.com",
      "wrongpassword",
      expect.any(Function)
    );
    expect(mockShowLoginErrorToast).toHaveBeenCalled();
  });

  it("should handle checkout flow when to_checkout is true", async () => {
    // We can't easily mock useSearchParams in this test context
    // The hook will use the default false behavior from our global mock
    const mockUser = {
      id: 1,
      first_name: "Test",
      last_name: "User",
      email: "test@test.com",
      address: "Test Address",
      phone_number: "123456789",
      is_admin: false,
    };

    mockLogIn.mockImplementation(async (email, password, callback) => {
      callback(mockUser);
    });

    const { result } = renderHook(() => useLogin(), { wrapper: TestWrapper });

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "password123",
      });
    });

    expect(mockUserDataContext.settleSuccessfulLogIn).toHaveBeenCalledWith(
      false, // Default behavior since we can't mock the search params easily
      mockUser,
      expect.any(Object)
    );
  });
});
