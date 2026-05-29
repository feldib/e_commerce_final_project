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
  USER_LOCALE: "userLocale",
} as const;

// Locale settings
export const SUPPORTED_LOCALES = ["en", "he", "hu"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const TOAST_TYPES = ["success", "error", "info", "warning"] as const;
export type ToastType = (typeof TOAST_TYPES)[number];

// Translation key constants for toast messages
export const TOAST_KEYS = {
  // Authentication & User Management
  AUTH: {
    LOGIN: {
      SUCCESS: "toast.login_success",
      INCORRECT_CREDENTIALS: "toast.incorrect_credentials",
    },
    LOGOUT: {
      SUCCESS: "toast.logout_success",
    },
    REGISTRATION: {
      SUCCESS: "toast.registration_successful",
      FAILED: "toast.registration_failed",
      USER_ALREADY_EXISTS: "toast.user_already_registered",
    },
    PASSWORD: {
      RESET_SUCCESS: "toast.password_reset_success",
      CHANGE_ERROR: "toast.password_change_error",
    },
  },

  // Form Validation & Data Operations
  FORM: {
    INCORRECT_DATA: "toast.incorrect_data",
    SUBMISSION_ERROR: "toast.submission_error",
    DATA_SAVE_SUCCESS: "toast.data_saved_successfully",
    DATA_CHANGES_SAVED: "toast.changes_saved",
    DATA_SAVE_ERROR: "toast.save_error",
  },

  // Communication & Messages
  COMMUNICATION: {
    MESSAGE: {
      SENT_SUCCESS: "toast.message_sent",
      SEND_ERROR: "toast.message_error",
    },
    EMAIL: {
      SUBMITTED_SUCCESS: "toast.email_submitted",
    },
    REPLY: {
      SENT_SUCCESS: "toast.reply_success",
      SEND_ERROR: "toast.reply_error",
    },
  },

  // Reviews & Ratings
  REVIEWS: {
    SAVED_SUCCESS: "toast.review_saved",
    SAVE_ERROR: "toast.review_error",
    APPROVAL_NOTICE: "toast.review_approval_notice",
  },

  // Artwork Management
  ARTWORK: {
    ADD: {
      SUCCESS: "toast.artwork_added_successfully",
      ERROR: "toast.error_add_artwork",
    },
    THUMBNAIL: {
      REQUIRED: "validation.thumbnail_required",
      UPLOADED_SUCCESSFULLY:
        "components.forms.artwork.thumbnail_uploaded_successfully",
    },
    CATEGORY: {
      UPDATE_SUCCESS: "components.forms.artwork.category_updated_successfully",
      UPDATE_FAILED: "components.forms.artwork.failed_to_update_category",
    },
    IMAGES: {
      UPLOADED_SUCCESSFULLY:
        "components.forms.artwork.image_uploaded_successfully",
      UPLOAD_FAILED: "components.forms.artwork.failed_to_upload_image",
      REMOVE_FAILED: "components.forms.artwork.failed_to_remove_image",
    },
  },

  // Shopping Cart & Inventory
  CART: {
    ITEM_ADDED: "toast.item_added_to_cart",
    ITEM_OUT_OF_STOCK: "common.item_out_of_stock",
    EMPTY_WARNING: "common.shopping_list_empty",
  },

  // User Interface & Notifications
  UI: {
    INVOICE_NOTICE: "toast.ui_invoice_notice",
    SIGN_IN_TO_ADD_WISHLIST: "components.buttons.sign_in_to_add_wishlist",
    ERROR_REMOVE_ARTWORK: "toast.error_remove_artwork",
    ARTWORK_REMOVED_SUCCESSFULLY: "toast.artwork_removed_successfully",
  },
} as const;
