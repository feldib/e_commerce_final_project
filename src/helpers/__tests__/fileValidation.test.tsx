import { isValidImage, validateNewFile } from "../fileValidation";

// Mock constants
jest.mock("@/utils/constants", () => ({
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  VALID_IMAGE_EXTENSIONS: ["jpg", "jpeg", "png", "gif", "webp"],
}));

describe("fileValidation", () => {
  describe("isValidImage", () => {
    it("should return true for valid image extensions", () => {
      expect(isValidImage("image.jpg")).toBe(true);
      expect(isValidImage("photo.jpeg")).toBe(true);
      expect(isValidImage("picture.png")).toBe(true);
      expect(isValidImage("animation.gif")).toBe(true);
      expect(isValidImage("modern.webp")).toBe(true);
    });

    it("should return true for valid extensions with uppercase", () => {
      expect(isValidImage("image.JPG")).toBe(true);
      expect(isValidImage("photo.JPEG")).toBe(true);
      expect(isValidImage("picture.PNG")).toBe(true);
    });

    it("should return false for invalid extensions", () => {
      expect(isValidImage("document.pdf")).toBe(false);
      expect(isValidImage("video.mp4")).toBe(false);
      expect(isValidImage("text.txt")).toBe(false);
      expect(isValidImage("archive.zip")).toBe(false);
    });

    it("should return false for empty filename", () => {
      expect(isValidImage("")).toBe(false);
    });

    it("should return false for filename without extension", () => {
      expect(isValidImage("noextension")).toBe(false);
    });

    it("should return false for filename with just a dot", () => {
      expect(isValidImage("file.")).toBe(false);
    });

    it("should handle multiple dots in filename", () => {
      expect(isValidImage("my.image.file.jpg")).toBe(true);
      expect(isValidImage("my.document.file.pdf")).toBe(false);
    });
  });

  describe("validateNewFile", () => {
    const mockErrorMessageFn = jest.fn((key: string) => `Error: ${key}`);

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return null for valid file", () => {
      const file = new File(["content"], "image.jpg", { type: "image/jpeg" });
      Object.defineProperty(file, "size", { value: 1024 * 1024 }); // 1MB

      const result = validateNewFile(file, mockErrorMessageFn);

      expect(result).toBeNull();
      expect(mockErrorMessageFn).not.toHaveBeenCalled();
    });

    it("should return error message for invalid image type", () => {
      const file = new File(["content"], "document.pdf", {
        type: "application/pdf",
      });
      Object.defineProperty(file, "size", { value: 1024 }); // 1KB

      const result = validateNewFile(file, mockErrorMessageFn);

      expect(result).toBe("Error: validation.not_valid_image_type");
      expect(mockErrorMessageFn).toHaveBeenCalledWith(
        "validation.not_valid_image_type"
      );
    });

    it("should return error message for file too large", () => {
      const file = new File(["content"], "image.jpg", { type: "image/jpeg" });
      Object.defineProperty(file, "size", { value: 10 * 1024 * 1024 }); // 10MB

      const result = validateNewFile(file, mockErrorMessageFn);

      expect(result).toBe("Error: validation.max_allowed_size");
      expect(mockErrorMessageFn).toHaveBeenCalledWith(
        "validation.max_allowed_size"
      );
    });

    it("should prioritize image type validation over size validation", () => {
      const file = new File(["content"], "document.pdf", {
        type: "application/pdf",
      });
      Object.defineProperty(file, "size", { value: 10 * 1024 * 1024 }); // 10MB

      const result = validateNewFile(file, mockErrorMessageFn);

      expect(result).toBe("Error: validation.not_valid_image_type");
      expect(mockErrorMessageFn).toHaveBeenCalledWith(
        "validation.not_valid_image_type"
      );
      expect(mockErrorMessageFn).toHaveBeenCalledTimes(1);
    });

    it("should handle edge case at size limit", () => {
      const file = new File(["content"], "image.jpg", { type: "image/jpeg" });
      Object.defineProperty(file, "size", { value: 5 * 1024 * 1024 }); // Exactly 5MB

      const result = validateNewFile(file, mockErrorMessageFn);

      expect(result).toBeNull();
      expect(mockErrorMessageFn).not.toHaveBeenCalled();
    });

    it("should handle edge case just over size limit", () => {
      const file = new File(["content"], "image.jpg", { type: "image/jpeg" });
      Object.defineProperty(file, "size", { value: 5 * 1024 * 1024 + 1 }); // 5MB + 1 byte

      const result = validateNewFile(file, mockErrorMessageFn);

      expect(result).toBe("Error: validation.max_allowed_size");
      expect(mockErrorMessageFn).toHaveBeenCalledWith(
        "validation.max_allowed_size"
      );
    });
  });
});
