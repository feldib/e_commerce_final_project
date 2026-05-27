/**
 * Mock for toast utilities
 */

export const showToast = {
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
};
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
