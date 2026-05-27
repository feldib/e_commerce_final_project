import * as toastUtils from "@/utils/toastUtils";

import { createHandleSubmitClick } from "../formValidationHelpers";

// Mock toast utils
jest.mock("@/utils/toastUtils", () => ({
  formToast: {
    incorrectData: jest.fn(),
  },
}));

describe("formValidationHelpers", () => {
  describe("createHandleSubmitClick", () => {
    const mockT = jest.fn((key: string) => `translated_${key}`);
    const mockShowIncorrectDataToast =
      toastUtils.formToast.incorrectData as jest.MockedFunction<
        typeof toastUtils.formToast.incorrectData
      >;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return a function", () => {
      const handleSubmitClick = createHandleSubmitClick(mockT);

      expect(typeof handleSubmitClick).toBe("function");
    });

    it("should show toast when errors exist", () => {
      const handleSubmitClick = createHandleSubmitClick(mockT);
      const errors = {
        email: "Invalid email",
        password: "Password too short",
      };

      handleSubmitClick(errors);

      expect(mockShowIncorrectDataToast).toHaveBeenCalledWith(mockT);
    });

    it("should not show toast when no errors exist", () => {
      const handleSubmitClick = createHandleSubmitClick(mockT);
      const errors = {};

      handleSubmitClick(errors);

      expect(mockShowIncorrectDataToast).not.toHaveBeenCalled();
    });

    it("should not show toast when errors object is empty with explicit check", () => {
      const handleSubmitClick = createHandleSubmitClick(mockT);
      const errors: Record<string, unknown> = {};

      handleSubmitClick(errors);

      expect(mockShowIncorrectDataToast).not.toHaveBeenCalled();
    });

    it("should show toast with single error", () => {
      const handleSubmitClick = createHandleSubmitClick(mockT);
      const errors = {
        username: "Username is required",
      };

      handleSubmitClick(errors);

      expect(mockShowIncorrectDataToast).toHaveBeenCalledWith(mockT);
    });

    it("should work with different translation functions", () => {
      const alternativeT = jest.fn((key: string) => `alt_${key}`);
      const handleSubmitClick = createHandleSubmitClick(alternativeT);
      const errors = {
        field: "error",
      };

      handleSubmitClick(errors);

      expect(mockShowIncorrectDataToast).toHaveBeenCalledWith(alternativeT);
    });

    it("should handle errors with undefined values", () => {
      const handleSubmitClick = createHandleSubmitClick(mockT);
      const errors = {
        field1: undefined,
        field2: null,
        field3: "",
      };

      handleSubmitClick(errors);

      expect(mockShowIncorrectDataToast).toHaveBeenCalledWith(mockT);
    });

    it("should handle nested error objects", () => {
      const handleSubmitClick = createHandleSubmitClick(mockT);
      const errors = {
        user: {
          email: "Invalid email",
          name: "Name required",
        },
      };

      handleSubmitClick(errors);

      expect(mockShowIncorrectDataToast).toHaveBeenCalledWith(mockT);
    });

    it("should handle array error values", () => {
      const handleSubmitClick = createHandleSubmitClick(mockT);
      const errors = {
        items: ["Item 1 error", "Item 2 error"],
      };

      handleSubmitClick(errors);

      expect(mockShowIncorrectDataToast).toHaveBeenCalledWith(mockT);
    });
  });
});
