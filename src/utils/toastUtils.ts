import { toast } from "react-toastify";

import { TOAST_KEYS, ToastType } from "./constants";

export const showToast = {
  success: (message: string) => toast.success(message, { className: "toast-success" }),
  error: (message: string) => toast.error(message, { className: "toast-error" }),
  info: (message: string) => toast.info(message, { className: "toast-info" }),
  warning: (message: string) => toast.warning(message, { className: "toast-warning" }),
}

// Factory function to create toast functions
const createToast = (messageKey: string, type: ToastType) =>
  (t: (key: string) => string) => showToast[type](t(messageKey));

// Generic toast function for direct message strings
export const showWarningToast = (message: string) =>
  showToast.warning(message);

// Authentication & User Management Toast Functions
export const authToast = {
  loginSuccess: createToast(TOAST_KEYS.AUTH_LOGIN_SUCCESS, "success"),
  logoutSuccess: createToast(TOAST_KEYS.AUTH_LOGOUT_SUCCESS, "success"),
  loginError: createToast(TOAST_KEYS.AUTH_INCORRECT_CREDENTIALS, "error"),
  registrationSuccess: createToast(TOAST_KEYS.AUTH_REGISTRATION_SUCCESS, "success"),
  registrationFailed: createToast(TOAST_KEYS.AUTH_REGISTRATION_FAILED, "error"),
  userAlreadyExists: createToast(TOAST_KEYS.AUTH_USER_ALREADY_EXISTS, "error"),
  passwordResetSuccess: createToast(TOAST_KEYS.AUTH_PASSWORD_RESET_SUCCESS, "success"),
  passwordChangeError: createToast(TOAST_KEYS.AUTH_PASSWORD_CHANGE_ERROR, "error"),
};

// Form Validation & Data Operations Toast Functions
export const formToast = {
  incorrectData: createToast(TOAST_KEYS.FORM_INCORRECT_DATA, "error"),
  submissionError: createToast(TOAST_KEYS.FORM_SUBMISSION_ERROR, "error"),
  dataSaveSuccess: createToast(TOAST_KEYS.DATA_SAVE_SUCCESS, "success"),
  changesSaved: createToast(TOAST_KEYS.DATA_CHANGES_SAVED, "success"),
  dataSaveError: createToast(TOAST_KEYS.DATA_SAVE_ERROR, "error"),
};

// Communication & Messages Toast Functions
export const messageToast = {
  messageSuccess: createToast(TOAST_KEYS.MESSAGE_SENT_SUCCESS, "success"),
  messageSendError: createToast(TOAST_KEYS.MESSAGE_SEND_ERROR, "error"),
  emailSubmitted: createToast(TOAST_KEYS.EMAIL_SUBMITTED_SUCCESS, "success"),
  replySentSuccess: createToast(TOAST_KEYS.REPLY_SENT_SUCCESS, "success"),
  replySendError: createToast(TOAST_KEYS.REPLY_SEND_ERROR, "error"),
};

// Reviews & Ratings Toast Functions
export const reviewToast = {
  saveSuccess: (t: (key: string) => string) => {
    showToast.success(t(TOAST_KEYS.REVIEW_SAVED_SUCCESS));
    showToast.info(t(TOAST_KEYS.REVIEW_APPROVAL_NOTICE));
  },
  saveError: createToast(TOAST_KEYS.REVIEW_SAVE_ERROR, "error"),
};

// Artwork Management Toast Functions
export const artworkToast = {
  addSuccess: createToast(TOAST_KEYS.ARTWORK_ADD_SUCCESS, "success"),
  addError: createToast(TOAST_KEYS.ARTWORK_ADD_ERROR, "error"),
  thumbnailRequired: createToast(TOAST_KEYS.ARTWORK_THUMBNAIL_REQUIRED, "error"),
};

// Shopping Cart & Inventory Toast Functions
export const cartToast = {
  itemAdded: createToast(TOAST_KEYS.CART_ITEM_ADDED, "success"),
  itemOutOfStock: createToast(TOAST_KEYS.CART_ITEM_OUT_OF_STOCK, "error"),
  cartEmptyWarning: createToast(TOAST_KEYS.CART_EMPTY_WARNING, "warning"),
};

// User Interface & Notifications Toast Functions
export const uiToast = {
  invoiceNotice: createToast(TOAST_KEYS.UI_INVOICE_NOTICE, "warning"),
};
