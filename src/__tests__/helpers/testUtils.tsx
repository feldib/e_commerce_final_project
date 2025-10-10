/**
 * Test helpers and utilities
 * Common functions and configurations for testing
 */
import React from "react";
import { render, RenderOptions } from "@testing-library/react";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";
import ThemeProvider from "@/components/providers/ThemeProvider/ThemeProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

// Mock user data for tests
const mockUser = {
  id: 1,
  first_name: "Test",
  last_name: "User",
  email: "test@example.com",
  address: "123 Test Street",
  phone_number: "123-456-7890",
  is_admin: false,
};

// Mock providers
export const mockI18nProvider = {
  t: jest.fn((key: string) => key),
  locale: "en",
  setLocale: jest.fn(),
};

export const mockUserDataContext = {
  loggedIn: false,
  user: mockUser,
  logOut: jest.fn(),
  settleSuccessfulLogIn: jest.fn(),
};

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialUserState?: Partial<typeof mockUserDataContext>;
  initialI18nState?: Partial<typeof mockI18nProvider>;
  withProviders?: boolean;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const {
    initialUserState = {},
    initialI18nState = {},
    withProviders = true,
    ...renderOptions
  } = options;

  const userContextValue = { ...mockUserDataContext, ...initialUserState };
  const i18nContextValue = { ...mockI18nProvider, ...initialI18nState };

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (!withProviders) {
      return <>{children}</>;
    }

    return (
      <I18nProvider>
        <UserDataContext.Provider value={userContextValue}>
          <ThemeProvider>{children}</ThemeProvider>
        </UserDataContext.Provider>
      </I18nProvider>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    userContextValue,
    i18nContextValue,
  };
};

// Common mock functions
export const createMockHandler = () => jest.fn();

// Basic test to prevent Jest error about no tests
describe("testUtils", () => {
  it("should export test utilities", () => {
    expect(renderWithProviders).toBeDefined();
    expect(createMockHandler).toBeDefined();
    expect(mockI18nProvider).toBeDefined();
    expect(mockUserDataContext).toBeDefined();
  });
});
