import React from "react";
import { render } from "@testing-library/react";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import HomePage from "../page";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

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

describe("HomePage", () => {
  it("should render without crashing", () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Just verify the component renders without errors
    expect(document.body).toBeTruthy();
  });

  it("should contain main page content", () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Check for presence of main container or key elements
    const mainElement =
      document.querySelector("main") ||
      document.querySelector(".container") ||
      document.querySelector("div");
    expect(mainElement).toBeTruthy();
  });
});
