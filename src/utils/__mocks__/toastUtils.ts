/**
 * Mock for toast utilities
 */

export const showToast = jest.fn();
export const authToast = {
  loginSuccess: jest.fn(),
  loginError: jest.fn(),
  logoutSuccess: jest.fn(),
  registrationSuccess: jest.fn(),
  registrationFailed: jest.fn(),
  userAlreadyExists: jest.fn(),
  passwordResetSuccess: jest.fn(),
  passwordChangeError: jest.fn(),
};
