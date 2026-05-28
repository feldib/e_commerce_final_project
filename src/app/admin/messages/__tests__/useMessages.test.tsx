import React from "react";
import { renderHook } from "@testing-library/react";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import useMessages from "../useMessages";

// Mock fetching functions
jest.mock("@/fetching/messages", () => ({
  getMessages: jest.fn(),
  replyToMessage: jest.fn(),
}));

const mockUserDataContext = {
  loggedIn: true,
  user: {
    id: 1,
    first_name: "Admin",
    last_name: "User",
    email: "admin@test.com",
    address: "",
    phone_number: "",
    is_admin: true,
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

describe("useMessages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize and return required properties", () => {
    const { result } = renderHook(() => useMessages(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.t).toBe("function");
    expect(result.current.messagesRepresented).toBeDefined();
  });
});
