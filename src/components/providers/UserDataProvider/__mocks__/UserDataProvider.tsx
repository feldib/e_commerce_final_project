/**
 * Mock for UserDataProvider component
 */
import React from "react";

const mockUser = {
  id: 1,
  first_name: "Test",
  last_name: "User",
  email: "test@example.com",
  address: "123 Test Street",
  phone_number: "123-456-7890",
  is_admin: false,
};

export const mockUserDataContext = {
  loggedIn: true,
  user: mockUser,
  logOut: jest.fn(),
  settleSuccessfulLogIn: jest.fn(),
};

export const UserDataContext = React.createContext(mockUserDataContext);

export const UserDataProvider = jest.fn(
  ({ children }: { children: React.ReactNode }) => (
    <div data-testid="user-data-provider">{children}</div>
  )
);

export const useUserData = jest.fn(() => mockUserDataContext);

export default UserDataProvider;
