import { toast } from "react-toastify";

import { TOAST_KEYS, ToastType } from "./constants";

export const showToast = (message: string, type: ToastType) => {
  const options = {
    className: `toast-${type}`,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    default:
      toast(message, options);
  }
}

// Factory function to create toast functions
const createToast = (messageKey: string, type: ToastType) =>
  (t: (key: string) => string) => showToast(t(messageKey), type);

// Generic toast function for direct message strings
export const showWarningToast = (message: string) =>
  showToast(message, "warning");

// Authentication & User Management Toast Functions
export const showLoginSuccessToast = createToast(TOAST_KEYS.AUTH_LOGIN_SUCCESS, "success");
export const showLogoutSuccessToast = createToast(TOAST_KEYS.AUTH_LOGOUT_SUCCESS, "success");
export const showLoginErrorToast = createToast(TOAST_KEYS.AUTH_INCORRECT_CREDENTIALS, "error");
export const showRegistrationSuccessToast = createToast(TOAST_KEYS.AUTH_REGISTRATION_SUCCESS, "success");
export const showRegistrationFailedToast = createToast(TOAST_KEYS.AUTH_REGISTRATION_FAILED, "error");
export const showUserAlreadyExistsToast = createToast(TOAST_KEYS.AUTH_USER_ALREADY_EXISTS, "error");
export const showPasswordResetSuccessToast = createToast(TOAST_KEYS.AUTH_PASSWORD_RESET_SUCCESS, "success");
export const showPasswordChangeErrorToast = createToast(TOAST_KEYS.AUTH_PASSWORD_CHANGE_ERROR, "error");

// Form Validation & Data Operations Toast Functions
export const showIncorrectDataToast = createToast(TOAST_KEYS.FORM_INCORRECT_DATA, "error");
export const showFormSubmissionErrorToast = createToast(TOAST_KEYS.FORM_SUBMISSION_ERROR, "error");
export const showDataSaveSuccessToast = createToast(TOAST_KEYS.DATA_SAVE_SUCCESS, "success");
export const showChangesSavedToast = createToast(TOAST_KEYS.DATA_CHANGES_SAVED, "success");
export const showDataSaveErrorToast = createToast(TOAST_KEYS.DATA_SAVE_ERROR, "error");

// Communication & Messages Toast Functions
export const showMessageSentSuccessToast = createToast(TOAST_KEYS.MESSAGE_SENT_SUCCESS, "success");
export const showMessageSendErrorToast = createToast(TOAST_KEYS.MESSAGE_SEND_ERROR, "error");
export const showEmailSubmittedSuccessToast = createToast(TOAST_KEYS.EMAIL_SUBMITTED_SUCCESS, "success");
export const showReplySentSuccessToast = createToast(TOAST_KEYS.REPLY_SENT_SUCCESS, "success");
export const showReplySendErrorToast = createToast(TOAST_KEYS.REPLY_SEND_ERROR, "error");

// Reviews & Ratings Toast Functions
export const showReviewSavedSuccessToast = (t: (key: string) => string) => {
  showToast(t(TOAST_KEYS.REVIEW_SAVED_SUCCESS), "success");
  showToast(t(TOAST_KEYS.REVIEW_APPROVAL_NOTICE), "info");
};
export const showReviewSaveErrorToast = createToast(TOAST_KEYS.REVIEW_SAVE_ERROR, "error");

// Artwork Management Toast Functions
export const showArtworkAddSuccessToast = createToast(TOAST_KEYS.ARTWORK_ADD_SUCCESS, "success");
export const showArtworkAddErrorToast = createToast(TOAST_KEYS.ARTWORK_ADD_ERROR, "error");
export const showArtworkThumbnailRequiredToast = createToast(TOAST_KEYS.ARTWORK_THUMBNAIL_REQUIRED, "error");

// Shopping Cart & Inventory Toast Functions
export const showCartItemAddedToast = createToast(TOAST_KEYS.CART_ITEM_ADDED, "success");
export const showCartItemOutOfStockToast = createToast(TOAST_KEYS.CART_ITEM_OUT_OF_STOCK, "error");
export const showCartEmptyWarningToast = createToast(TOAST_KEYS.CART_EMPTY_WARNING, "warning");

// User Interface & Notifications Toast Functions
export const showInvoiceNoticeToast = createToast(TOAST_KEYS.UI_INVOICE_NOTICE, "warning");
