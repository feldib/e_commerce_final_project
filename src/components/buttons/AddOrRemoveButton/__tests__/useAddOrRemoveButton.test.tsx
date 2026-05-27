import React from "react";
import { act, renderHook } from "@testing-library/react";

import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import useAddOrRemoveButton from "../useAddOrRemoveButton";

// Mock toast utils
jest.mock("@/utils/toastUtils", () => ({
  showToast: {
    warning: jest.fn(),
  },
}));

// Mock functions
const mockIsAdded = jest.fn();
const mockAddToAdded = jest.fn();
const mockRemoveFromAdded = jest.fn();

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

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UserDataContext.Provider value={mockUserDataContext}>
    {children}
  </UserDataContext.Provider>
);

describe("useAddOrRemoveButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with added state false", async () => {
    mockIsAdded.mockResolvedValue(false);

    const { result } = renderHook(
      () =>
        useAddOrRemoveButton({
          artwork_id: 1,
          isAdded: mockIsAdded,
          addToAdded: mockAddToAdded,
          removeFromAdded: mockRemoveFromAdded,
          toastWarningMessage: "Please login",
        }),
      { wrapper }
    );

    expect(result.current.added).toBe(false);
  });

  it("should add item when not added and user is logged in", async () => {
    mockIsAdded.mockResolvedValue(false);
    mockAddToAdded.mockResolvedValue(undefined);

    const { result } = renderHook(
      () =>
        useAddOrRemoveButton({
          artwork_id: 1,
          isAdded: mockIsAdded,
          addToAdded: mockAddToAdded,
          removeFromAdded: mockRemoveFromAdded,
          toastWarningMessage: "Please login",
        }),
      { wrapper }
    );

    await act(async () => {
      await result.current.handleButtonClick();
    });

    expect(mockAddToAdded).toHaveBeenCalledWith(1);
  });

  it("should remove item when added and user is logged in", async () => {
    mockIsAdded.mockResolvedValue(true);
    mockRemoveFromAdded.mockResolvedValue(undefined);

    const { result } = renderHook(
      () =>
        useAddOrRemoveButton({
          artwork_id: 1,
          isAdded: mockIsAdded,
          addToAdded: mockAddToAdded,
          removeFromAdded: mockRemoveFromAdded,
          toastWarningMessage: "Please login",
        }),
      { wrapper }
    );

    // Wait for initial state to be set
    await act(async () => {
      // Trigger useEffect
    });

    await act(async () => {
      await result.current.handleButtonClick();
    });

    expect(mockRemoveFromAdded).toHaveBeenCalledWith(1);
  });

  it("should show warning toast when user is not logged in", async () => {
    const toastUtils = await import("@/utils/toastUtils");

    const notLoggedInContext = {
      ...mockUserDataContext,
      loggedIn: false,
    };

    const notLoggedInWrapper = ({
      children,
    }: {
      children: React.ReactNode;
    }) => (
      <UserDataContext.Provider value={notLoggedInContext}>
        {children}
      </UserDataContext.Provider>
    );

    const { result } = renderHook(
      () =>
        useAddOrRemoveButton({
          artwork_id: 1,
          isAdded: mockIsAdded,
          addToAdded: mockAddToAdded,
          removeFromAdded: mockRemoveFromAdded,
          toastWarningMessage: "Please login",
        }),
      { wrapper: notLoggedInWrapper }
    );

    await act(async () => {
      await result.current.handleButtonClick();
    });

    expect(toastUtils.showToast.warning).toHaveBeenCalledWith("Please login");
    expect(mockAddToAdded).not.toHaveBeenCalled();
    expect(mockRemoveFromAdded).not.toHaveBeenCalled();
  });
});
