import { toast } from "react-toastify";

import { showToast } from "../toastUtils";

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
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
});
