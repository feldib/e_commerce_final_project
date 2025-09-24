import { toast } from "react-toastify";

// Standard toast notification utilities
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    className: "toast-success",
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    className: "toast-error",
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    className: "toast-info",
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    className: "toast-warning",
  });
};

// Common notification messages
export const COMMON_MESSAGES = {
  // Auth related
  LOGIN_SUCCESS: "Logged in",
  LOGOUT_SUCCESS: "Logged out",
  REGISTRATION_SUCCESS: "Registration successful",
  PASSWORD_RESET_SUCCESS: "Password changed successfully",

  // Form submissions
  MESSAGE_SENT: "Message sent",
  REVIEW_SAVED: "Review saved",
  EMAIL_SUBMITTED: "Email submitted",

  // Data operations
  DATA_SAVED: "Data saved successfully",
  CHANGES_SAVED: "Changes saved",

  // Errors
  INCORRECT_CREDENTIALS: "Incorrect email or password",
  SUBMISSION_ERROR: "Error: couldn't submit",
  SAVE_ERROR: "Error: couldn't save",
  PASSWORD_CHANGE_ERROR: "Error: couldn't change password",
  MESSAGE_ERROR: "Error: couldn't send message",
  REVIEW_ERROR: "Error: couldn't save review",
  INCORRECT_DATA: "Incorrect data",

  // Info
  REVIEW_APPROVAL_NOTICE: "The review has to be approved by the administrator",
  REPLY_SUCCESS: "Reply sent successfully!",
  REPLY_ERROR: "Error: couldn't send reply",
} as const;

// Convenience functions for common toast patterns
export const showLoginSuccessToast = () =>
  showSuccessToast(COMMON_MESSAGES.LOGIN_SUCCESS);
export const showLoginErrorToast = () =>
  showErrorToast(COMMON_MESSAGES.INCORRECT_CREDENTIALS);
export const showMessageSentToast = () =>
  showSuccessToast(COMMON_MESSAGES.MESSAGE_SENT);
export const showMessageErrorToast = () =>
  showErrorToast(COMMON_MESSAGES.MESSAGE_ERROR);
export const showReviewSavedToast = () => {
  showSuccessToast(COMMON_MESSAGES.REVIEW_SAVED);
  showInfoToast(COMMON_MESSAGES.REVIEW_APPROVAL_NOTICE);
};
export const showReviewErrorToast = () =>
  showErrorToast(COMMON_MESSAGES.REVIEW_ERROR);
export const showEmailSubmittedToast = () =>
  showSuccessToast(COMMON_MESSAGES.EMAIL_SUBMITTED);
export const showSubmissionErrorToast = () =>
  showErrorToast(COMMON_MESSAGES.SUBMISSION_ERROR);
export const showPasswordResetSuccessToast = () =>
  showSuccessToast(COMMON_MESSAGES.PASSWORD_RESET_SUCCESS);
export const showPasswordChangeErrorToast = () =>
  showErrorToast(COMMON_MESSAGES.PASSWORD_CHANGE_ERROR);
export const showIncorrectDataToast = () =>
  showErrorToast(COMMON_MESSAGES.INCORRECT_DATA);
export const showReplySuccessToast = () =>
  showSuccessToast(COMMON_MESSAGES.REPLY_SUCCESS);
export const showReplyErrorToast = () =>
  showErrorToast(COMMON_MESSAGES.REPLY_ERROR);
