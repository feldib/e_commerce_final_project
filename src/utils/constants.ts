// Image upload constraints
export const MAX_IMAGE_SIZE = 102400; //100KB

export const VALID_IMAGE_EXTENSIONS = [
  "jpg",
  "gif",
  "png",
  "jpeg",
  "svg",
  "webp",
] as const;

// UI Dimensions
export const UI_DIMENSIONS = {
  THUMBNAIL_SIZE: 100,
  CARD_IMAGE_WIDTH: 500,
  CAROUSEL_INTERVAL: 3000,
} as const;

// Tag related constants
const KEY_CODES = {
  comma: 188,
  enter: 13,
  space: 32,
} as const;

export const TAG_DELIMITERS = [
  KEY_CODES.comma,
  KEY_CODES.enter,
  KEY_CODES.space,
] as const;

// For new react-tags separators prop (v7+)
export const TAG_SEPARATORS = [",", "Enter", " "] as const;

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const USERS_URL = "users";
export const ADMIN_URL = "admin";

// Local Storage Keys
export const STORAGE_KEYS = {
  SHOPPING_CART: "shopping_cart",
} as const;

// Translation key constants for toast messages
export const TOAST_KEYS = {
  // Authentication & User Management
  AUTH_LOGIN_SUCCESS: "toast.login_success",
  AUTH_LOGOUT_SUCCESS: "toast.logout_success",
  AUTH_REGISTRATION_SUCCESS: "toast.registration_successful",
  AUTH_REGISTRATION_FAILED: "toast.registration_failed",
  AUTH_USER_ALREADY_EXISTS: "toast.user_already_registered",
  AUTH_PASSWORD_RESET_SUCCESS: "toast.password_reset_success",
  AUTH_PASSWORD_CHANGE_ERROR: "toast.password_change_error",
  AUTH_INCORRECT_CREDENTIALS: "toast.incorrect_credentials",

  // Form Validation & Data Operations
  FORM_INCORRECT_DATA: "toast.incorrect_data",
  FORM_SUBMISSION_ERROR: "toast.submission_error",
  DATA_SAVE_SUCCESS: "toast.data_saved_successfully",
  DATA_CHANGES_SAVED: "toast.changes_saved",
  DATA_SAVE_ERROR: "toast.save_error",

  // Communication & Messages
  MESSAGE_SENT_SUCCESS: "toast.message_sent",
  MESSAGE_SEND_ERROR: "toast.message_error",
  EMAIL_SUBMITTED_SUCCESS: "toast.email_submitted",
  REPLY_SENT_SUCCESS: "toast.reply_success",
  REPLY_SEND_ERROR: "toast.reply_error",

  // Reviews & Ratings
  REVIEW_SAVED_SUCCESS: "toast.review_saved",
  REVIEW_SAVE_ERROR: "toast.review_error",
  REVIEW_APPROVAL_NOTICE: "toast.review_approval_notice",

  // Artwork Management
  ARTWORK_ADD_SUCCESS: "toast.artwork_added_successfully",
  ARTWORK_ADD_ERROR: "toast.error_add_artwork",
  ARTWORK_THUMBNAIL_REQUIRED: "validation.thumbnail_required",

  // Shopping Cart & Inventory
  CART_ITEM_ADDED: "toast.item_added_to_cart",
  CART_ITEM_OUT_OF_STOCK: "common.item_out_of_stock",
  CART_EMPTY_WARNING: "common.shopping_list_empty",

  // User Interface & Notifications
  UI_INVOICE_NOTICE: "toast.only_effects_invoice",
} as const;
