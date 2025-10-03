import { MAX_IMAGE_SIZE, VALID_IMAGE_EXTENSIONS } from "@/utils/constants";

export const isValidImage = (fileName: string): boolean => {
  if (!fileName) return false;
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  return VALID_IMAGE_EXTENSIONS.includes(
    ext as (typeof VALID_IMAGE_EXTENSIONS)[number],
  );
};

export const validateNewFile = (
  file: File,
  errorMessageFn: (key: string) => string,
): string | null => {
  if (!isValidImage(file.name)) {
    return errorMessageFn("validation.not_valid_image_type");
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return errorMessageFn("validation.max_allowed_size");
  }
  return null;
};
