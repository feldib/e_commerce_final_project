import { toast } from "react-toastify";

import {
  artworkToast,
  authToast,
  cartToast,
  formToast,
  messageToast,
  reviewToast,
  showToast,
  uiToast,
} from "../toastUtils";

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
}));

// Mock constants
jest.mock("../constants", () => ({
  TOAST_KEYS: {
    AUTH_LOGIN_SUCCESS: "auth.login.success",
    AUTH_LOGOUT_SUCCESS: "auth.logout.success",
    AUTH_INCORRECT_CREDENTIALS: "auth.login.error",
    AUTH_REGISTRATION_SUCCESS: "auth.registration.success",
    AUTH_REGISTRATION_FAILED: "auth.registration.failed",
    AUTH_USER_ALREADY_EXISTS: "auth.user.exists",
    AUTH_PASSWORD_RESET_SUCCESS: "auth.password.reset.success",
    AUTH_PASSWORD_CHANGE_ERROR: "auth.password.change.error",
    FORM_INCORRECT_DATA: "form.incorrect.data",
    FORM_SUBMISSION_ERROR: "form.submission.error",
    DATA_SAVE_SUCCESS: "data.save.success",
    DATA_CHANGES_SAVED: "data.changes.saved",
    DATA_SAVE_ERROR: "data.save.error",
    MESSAGE_SENT_SUCCESS: "message.sent.success",
    MESSAGE_SEND_ERROR: "message.send.error",
    EMAIL_SUBMITTED_SUCCESS: "email.submitted.success",
    REPLY_SENT_SUCCESS: "reply.sent.success",
    REPLY_SEND_ERROR: "reply.send.error",
    REVIEW_SAVED_SUCCESS: "review.saved.success",
    REVIEW_APPROVAL_NOTICE: "review.approval.notice",
    REVIEW_SAVE_ERROR: "review.save.error",
    ARTWORK_ADD_SUCCESS: "artwork.add.success",
    ARTWORK_ADD_ERROR: "artwork.add.error",
    ARTWORK_THUMBNAIL_REQUIRED: "artwork.thumbnail.required",
    CART_ITEM_ADDED: "cart.item.added",
    CART_ITEM_OUT_OF_STOCK: "cart.item.out.of.stock",
    CART_EMPTY_WARNING: "cart.empty.warning",
    UI_INVOICE_NOTICE: "ui.invoice.notice",
  },
}));

describe("toastUtils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic toast functions", () => {
    it("should show success toast", () => {
      showToast.success("Test success message");
      expect(toast.success).toHaveBeenCalledWith("Test success message", {
        className: "toast-success",
      });
    });

    it("should show error toast", () => {
      showToast.error("Test error message");
      expect(toast.error).toHaveBeenCalledWith("Test error message", {
        className: "toast-error",
      });
    });

    it("should show info toast", () => {
      showToast.info("Test info message");
      expect(toast.info).toHaveBeenCalledWith("Test info message", {
        className: "toast-info",
      });
    });

    it("should show warning toast", () => {
      showToast.warning("Test warning message");
      expect(toast.warning).toHaveBeenCalledWith("Test warning message", {
        className: "toast-warning",
      });
    });
  });

  describe("Authentication toast functions", () => {
    const mockT = jest.fn((key: string) => `translated_${key}`);

    it("should show login success toast", () => {
      authToast.loginSuccess(mockT);
      expect(mockT).toHaveBeenCalledWith("auth.login.success");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_auth.login.success",
        {
          className: "toast-success",
        }
      );
    });

    it("should show logout success toast", () => {
      authToast.logoutSuccess(mockT);
      expect(mockT).toHaveBeenCalledWith("auth.logout.success");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_auth.logout.success",
        {
          className: "toast-success",
        }
      );
    });

    it("should show login error toast", () => {
      authToast.loginError(mockT);
      expect(mockT).toHaveBeenCalledWith("auth.login.error");
      expect(toast.error).toHaveBeenCalledWith("translated_auth.login.error", {
        className: "toast-error",
      });
    });

    it("should show registration success toast", () => {
      authToast.registrationSuccess(mockT);
      expect(mockT).toHaveBeenCalledWith("auth.registration.success");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_auth.registration.success",
        {
          className: "toast-success",
        }
      );
    });

    it("should show registration failed toast", () => {
      authToast.registrationFailed(mockT);
      expect(mockT).toHaveBeenCalledWith("auth.registration.failed");
      expect(toast.error).toHaveBeenCalledWith(
        "translated_auth.registration.failed",
        {
          className: "toast-error",
        }
      );
    });

    it("should show user already exists toast", () => {
      authToast.userAlreadyExists(mockT);
      expect(mockT).toHaveBeenCalledWith("auth.user.exists");
      expect(toast.error).toHaveBeenCalledWith("translated_auth.user.exists", {
        className: "toast-error",
      });
    });

    it("should show password reset success toast", () => {
      authToast.passwordResetSuccess(mockT);
      expect(mockT).toHaveBeenCalledWith("auth.password.reset.success");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_auth.password.reset.success",
        {
          className: "toast-success",
        }
      );
    });

    it("should show password change error toast", () => {
      authToast.passwordChangeError(mockT);
      expect(mockT).toHaveBeenCalledWith("auth.password.change.error");
      expect(toast.error).toHaveBeenCalledWith(
        "translated_auth.password.change.error",
        {
          className: "toast-error",
        }
      );
    });
  });

  describe("Form validation toast functions", () => {
    const mockT = jest.fn((key: string) => `translated_${key}`);

    it("should show incorrect data toast", () => {
      formToast.incorrectData(mockT);
      expect(mockT).toHaveBeenCalledWith("form.incorrect.data");
      expect(toast.error).toHaveBeenCalledWith(
        "translated_form.incorrect.data",
        {
          className: "toast-error",
        }
      );
    });

    it("should show form submission error toast", () => {
      formToast.submissionError(mockT);
      expect(mockT).toHaveBeenCalledWith("form.submission.error");
      expect(toast.error).toHaveBeenCalledWith(
        "translated_form.submission.error",
        {
          className: "toast-error",
        }
      );
    });

    it("should show data save success toast", () => {
      formToast.dataSaveSuccess(mockT);
      expect(mockT).toHaveBeenCalledWith("data.save.success");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_data.save.success",
        {
          className: "toast-success",
        }
      );
    });

    it("should show changes saved toast", () => {
      formToast.changesSaved(mockT);
      expect(mockT).toHaveBeenCalledWith("data.changes.saved");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_data.changes.saved",
        {
          className: "toast-success",
        }
      );
    });

    it("should show data save error toast", () => {
      formToast.dataSaveError(mockT);
      expect(mockT).toHaveBeenCalledWith("data.save.error");
      expect(toast.error).toHaveBeenCalledWith("translated_data.save.error", {
        className: "toast-error",
      });
    });
  });

  describe("Review functions", () => {
    const mockT = jest.fn((key: string) => `translated_${key}`);

    it("should show review saved success toast with approval notice", () => {
      reviewToast.saveSuccess(mockT);
      expect(mockT).toHaveBeenCalledWith("review.saved.success");
      expect(mockT).toHaveBeenCalledWith("review.approval.notice");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_review.saved.success",
        {
          className: "toast-success",
        }
      );
      expect(toast.info).toHaveBeenCalledWith(
        "translated_review.approval.notice",
        {
          className: "toast-info",
        }
      );
    });

    it("should show review save error toast", () => {
      reviewToast.saveError(mockT);
      expect(mockT).toHaveBeenCalledWith("review.save.error");
      expect(toast.error).toHaveBeenCalledWith("translated_review.save.error", {
        className: "toast-error",
      });
    });
  });

  describe("Shopping cart functions", () => {
    const mockT = jest.fn((key: string) => `translated_${key}`);

    it("should show cart item added toast", () => {
      cartToast.itemAdded(mockT);
      expect(mockT).toHaveBeenCalledWith("cart.item.added");
      expect(toast.success).toHaveBeenCalledWith("translated_cart.item.added", {
        className: "toast-success",
      });
    });

    it("should show cart item out of stock toast", () => {
      cartToast.itemOutOfStock(mockT);
      expect(mockT).toHaveBeenCalledWith("cart.item.out.of.stock");
      expect(toast.error).toHaveBeenCalledWith(
        "translated_cart.item.out.of.stock",
        {
          className: "toast-error",
        }
      );
    });

    it("should show cart empty warning toast", () => {
      cartToast.cartEmptyWarning(mockT);
      expect(mockT).toHaveBeenCalledWith("cart.empty.warning");
      expect(toast.warning).toHaveBeenCalledWith(
        "translated_cart.empty.warning",
        {
          className: "toast-warning",
        }
      );
    });
  });

  describe("Artwork functions", () => {
    const mockT = jest.fn((key: string) => `translated_${key}`);

    it("should show artwork add success toast", () => {
      artworkToast.addSuccess(mockT);
      expect(mockT).toHaveBeenCalledWith("artwork.add.success");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_artwork.add.success",
        {
          className: "toast-success",
        }
      );
    });

    it("should show artwork add error toast", () => {
      artworkToast.addError(mockT);
      expect(mockT).toHaveBeenCalledWith("artwork.add.error");
      expect(toast.error).toHaveBeenCalledWith("translated_artwork.add.error", {
        className: "toast-error",
      });
    });

    it("should show artwork thumbnail required toast", () => {
      artworkToast.thumbnailRequired(mockT);
      expect(mockT).toHaveBeenCalledWith("artwork.thumbnail.required");
      expect(toast.error).toHaveBeenCalledWith(
        "translated_artwork.thumbnail.required",
        {
          className: "toast-error",
        }
      );
    });
  });

  describe("Communication functions", () => {
    const mockT = jest.fn((key: string) => `translated_${key}`);

    it("should show message sent success toast", () => {
      messageToast.messageSuccess(mockT);
      expect(mockT).toHaveBeenCalledWith("message.sent.success");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_message.sent.success",
        {
          className: "toast-success",
        }
      );
    });

    it("should show message send error toast", () => {
      messageToast.messageSendError(mockT);
      expect(mockT).toHaveBeenCalledWith("message.send.error");
      expect(toast.error).toHaveBeenCalledWith(
        "translated_message.send.error",
        {
          className: "toast-error",
        }
      );
    });

    it("should show email submitted success toast", () => {
      messageToast.emailSubmitted(mockT);
      expect(mockT).toHaveBeenCalledWith("email.submitted.success");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_email.submitted.success",
        {
          className: "toast-success",
        }
      );
    });

    it("should show reply sent success toast", () => {
      messageToast.replySentSuccess(mockT);
      expect(mockT).toHaveBeenCalledWith("reply.sent.success");
      expect(toast.success).toHaveBeenCalledWith(
        "translated_reply.sent.success",
        {
          className: "toast-success",
        }
      );
    });

    it("should show reply send error toast", () => {
      messageToast.replySendError(mockT);
      expect(mockT).toHaveBeenCalledWith("reply.send.error");
      expect(toast.error).toHaveBeenCalledWith("translated_reply.send.error", {
        className: "toast-error",
      });
    });
  });

  describe("UI functions", () => {
    const mockT = jest.fn((key: string) => `translated_${key}`);

    it("should show invoice notice toast", () => {
      uiToast.invoiceNotice(mockT);
      expect(mockT).toHaveBeenCalledWith("ui.invoice.notice");
      expect(toast.warning).toHaveBeenCalledWith(
        "translated_ui.invoice.notice",
        {
          className: "toast-warning",
        }
      );
    });
  });
});
