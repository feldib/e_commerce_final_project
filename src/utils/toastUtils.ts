import { toast } from "react-toastify";

import { TOAST_KEYS, ToastType } from "./constants";

export const showToast = {
  success: (message: string) =>
    toast.success(message, { className: "toast-success" }),
  error: (message: string) =>
    toast.error(message, { className: "toast-error" }),
  info: (message: string) => toast.info(message, { className: "toast-info" }),
  warning: (message: string) =>
    toast.warning(message, { className: "toast-warning" }),
};

// Factory function to create toast functions
const createToast =
  (messageKey: string, type: ToastType) => (t: (key: string) => string) =>
    showToast[type](t(messageKey));

// Authentication & User Management Toast Functions
export const authToast = {
  loginSuccess: createToast(TOAST_KEYS.AUTH.LOGIN_SUCCESS, "success"),
  logoutSuccess: createToast(TOAST_KEYS.AUTH.LOGOUT_SUCCESS, "success"),
  loginError: createToast(TOAST_KEYS.AUTH.INCORRECT_CREDENTIALS, "error"),
  registrationSuccess: createToast(
    TOAST_KEYS.AUTH.REGISTRATION_SUCCESS,
    "success"
  ),
  registrationFailed: createToast(TOAST_KEYS.AUTH.REGISTRATION_FAILED, "error"),
  userAlreadyExists: createToast(TOAST_KEYS.AUTH.USER_ALREADY_EXISTS, "error"),
  passwordResetSuccess: createToast(
    TOAST_KEYS.AUTH.PASSWORD_RESET_SUCCESS,
    "success"
  ),
  passwordChangeError: createToast(
    TOAST_KEYS.AUTH.PASSWORD_CHANGE_ERROR,
    "error"
  ),
};

// Form Validation & Data Operations Toast Functions
export const formToast = {
  incorrectData: createToast(TOAST_KEYS.FORM.INCORRECT_DATA, "error"),
  submissionError: createToast(TOAST_KEYS.FORM.SUBMISSION_ERROR, "error"),
  dataSaveSuccess: createToast(TOAST_KEYS.FORM.DATA_SAVE_SUCCESS, "success"),
  changesSaved: createToast(TOAST_KEYS.FORM.DATA_CHANGES_SAVED, "success"),
  dataSaveError: createToast(TOAST_KEYS.FORM.DATA_SAVE_ERROR, "error"),
};

// Communication & Messages Toast Functions
export const messageToast = {
  messageSuccess: createToast(TOAST_KEYS.MESSAGES.SENT_SUCCESS, "success"),
  messageSendError: createToast(TOAST_KEYS.MESSAGES.SEND_ERROR, "error"),
  emailSubmitted: createToast(
    TOAST_KEYS.MESSAGES.EMAIL_SUBMITTED_SUCCESS,
    "success"
  ),
  replySentSuccess: createToast(
    TOAST_KEYS.MESSAGES.REPLY_SENT_SUCCESS,
    "success"
  ),
  replySendError: createToast(TOAST_KEYS.MESSAGES.REPLY_SEND_ERROR, "error"),
};

// Reviews & Ratings Toast Functions
export const reviewToast = {
  saveSuccess: (t: (key: string) => string) => {
    showToast.success(t(TOAST_KEYS.REVIEWS.SAVED_SUCCESS));
    showToast.info(t(TOAST_KEYS.REVIEWS.APPROVAL_NOTICE));
  },
  saveError: createToast(TOAST_KEYS.REVIEWS.SAVE_ERROR, "error"),
};

// Artwork Management Toast Functions
export const artworkToast = {
  addSuccess: createToast(TOAST_KEYS.ARTWORK.ADD_SUCCESS, "success"),
  addError: createToast(TOAST_KEYS.ARTWORK.ADD_ERROR, "error"),
  thumbnailRequired: createToast(
    TOAST_KEYS.ARTWORK.THUMBNAIL_REQUIRED,
    "error"
  ),
  categoryUpdated: createToast(
    TOAST_KEYS.ARTWORK.CATEGORY_UPDATE_SUCCESS,
    "success"
  ),
  failedToUpdateCategory: createToast(
    TOAST_KEYS.ARTWORK.CATEGORY_UPDATE_FAILED,
    "error"
  ),
  thumbnailUploadedSuccessfully: createToast(
    TOAST_KEYS.ARTWORK.THUMBNAIL_UPLOADED_SUCCESSFULLY,
    "success"
  ),
  imageUploadedSuccessfully: createToast(
    TOAST_KEYS.ARTWORK.IMAGE_UPLOADED_SUCCESSFULLY,
    "success"
  ),
  imageUploadFailed: createToast(
    TOAST_KEYS.ARTWORK.IMAGE_UPLOAD_FAILED,
    "error"
  ),
  imageRemoveFailed: createToast(
    TOAST_KEYS.ARTWORK.IMAGE_REMOVE_FAILED,
    "error"
  ),
};

// Shopping Cart & Inventory Toast Functions
export const cartToast = {
  itemAdded: createToast(TOAST_KEYS.CART.ITEM_ADDED, "success"),
  itemOutOfStock: createToast(TOAST_KEYS.CART.ITEM_OUT_OF_STOCK, "error"),
  cartEmptyWarning: createToast(TOAST_KEYS.CART.EMPTY_WARNING, "warning"),
};

// User Interface & Notifications Toast Functions
export const uiToast = {
  invoiceNotice: createToast(TOAST_KEYS.UI.INVOICE_NOTICE, "warning"),
  signInToAddWishlist: createToast(
    TOAST_KEYS.UI.SIGN_IN_TO_ADD_WISHLIST,
    "warning"
  ),
  errorRemoveArtwork: createToast(TOAST_KEYS.UI.ERROR_REMOVE_ARTWORK, "error"),
  artworkRemovedSuccessfully: createToast(
    TOAST_KEYS.UI.ARTWORK_REMOVED_SUCCESSFULLY,
    "success"
  ),
};
