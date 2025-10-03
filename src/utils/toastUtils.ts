import { toast } from "react-toastify";

import { TOAST_KEYS } from "./constants";

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

// Authentication & User Management Toast Functions
export const showLoginSuccessToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.AUTH_LOGIN_SUCCESS));
export const showLogoutSuccessToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.AUTH_LOGOUT_SUCCESS));
export const showLoginErrorToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.AUTH_INCORRECT_CREDENTIALS));
export const showRegistrationSuccessToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.AUTH_REGISTRATION_SUCCESS));
export const showRegistrationFailedToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.AUTH_REGISTRATION_FAILED));
export const showUserAlreadyExistsToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.AUTH_USER_ALREADY_EXISTS));
export const showPasswordResetSuccessToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.AUTH_PASSWORD_RESET_SUCCESS));
export const showPasswordChangeErrorToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.AUTH_PASSWORD_CHANGE_ERROR));

// Form Validation & Data Operations Toast Functions
export const showIncorrectDataToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.FORM_INCORRECT_DATA));
export const showFormSubmissionErrorToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.FORM_SUBMISSION_ERROR));
export const showDataSaveSuccessToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.DATA_SAVE_SUCCESS));
export const showChangesSavedToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.DATA_CHANGES_SAVED));
export const showDataSaveErrorToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.DATA_SAVE_ERROR));

// Communication & Messages Toast Functions
export const showMessageSentSuccessToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.MESSAGE_SENT_SUCCESS));
export const showMessageSendErrorToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.MESSAGE_SEND_ERROR));
export const showEmailSubmittedSuccessToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.EMAIL_SUBMITTED_SUCCESS));
export const showReplySentSuccessToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.REPLY_SENT_SUCCESS));
export const showReplySendErrorToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.REPLY_SEND_ERROR));

// Reviews & Ratings Toast Functions
export const showReviewSavedSuccessToast = (t: (key: string) => string) => {
  showSuccessToast(t(TOAST_KEYS.REVIEW_SAVED_SUCCESS));
  showInfoToast(t(TOAST_KEYS.REVIEW_APPROVAL_NOTICE));
};
export const showReviewSaveErrorToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.REVIEW_SAVE_ERROR));

// Artwork Management Toast Functions
export const showArtworkAddSuccessToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.ARTWORK_ADD_SUCCESS));
export const showArtworkAddErrorToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.ARTWORK_ADD_ERROR));
export const showArtworkThumbnailRequiredToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.ARTWORK_THUMBNAIL_REQUIRED));

// Shopping Cart & Inventory Toast Functions
export const showCartItemAddedToast = (t: (key: string) => string) =>
  showSuccessToast(t(TOAST_KEYS.CART_ITEM_ADDED));
export const showCartItemOutOfStockToast = (t: (key: string) => string) =>
  showErrorToast(t(TOAST_KEYS.CART_ITEM_OUT_OF_STOCK));
export const showCartEmptyWarningToast = (t: (key: string) => string) =>
  showWarningToast(t(TOAST_KEYS.CART_EMPTY_WARNING));

// User Interface & Notifications Toast Functions
export const showInvoiceNoticeToast = (t: (key: string) => string) =>
  showWarningToast(t(TOAST_KEYS.UI_INVOICE_NOTICE));
