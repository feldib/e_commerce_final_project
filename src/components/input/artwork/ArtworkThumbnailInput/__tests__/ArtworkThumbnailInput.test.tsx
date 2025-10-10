import React from "react";
import { render, screen } from "@testing-library/react";

import ArtworkThumbnailInput from "../ArtworkThumbnailInput";

// Mock the hook
jest.mock("../useArtworkThumbnailInput", () => ({
  __esModule: true,
  default: () => ({
    handleFileChange: jest.fn(),
    handleRemoveThumbnail: jest.fn(),
    t: (key: string) => key,
  }),
}));

// Mock ErrorAsterisk
jest.mock("@/components/input/ErrorAsterisk/ErrorAsterisk", () => {
  return function MockErrorAsterisk() {
    return <div data-testid="error-asterisk">ErrorAsterisk</div>;
  };
});

const mockFormik = {
  values: { thumbnail: null },
  errors: {},
  touched: {},
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  setFieldValue: jest.fn(),
  isSubmitting: false,
  isValidating: false,
  submitCount: 0,
  dirty: false,
  isValid: true,
  initialValues: {},
  initialErrors: {},
  initialTouched: {},
  resetForm: jest.fn(),
  setFieldError: jest.fn(),
  setFieldTouched: jest.fn(),
  setErrors: jest.fn(),
  setTouched: jest.fn(),
  setValues: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  submitForm: jest.fn(),
  validateForm: jest.fn(),
  validateField: jest.fn(),
  getFieldProps: jest.fn(),
  getFieldMeta: jest.fn(),
  getFieldHelpers: jest.fn(),
  status: undefined,
  validateOnChange: true,
  validateOnBlur: true,
  handleSubmit: jest.fn(),
  handleReset: jest.fn(),
};

describe("ArtworkThumbnailInput", () => {
  it("should render without crashing", () => {
    render(
      <ArtworkThumbnailInput
        formik={mockFormik}
        isEdit={false}
        label="Thumbnail"
      />
    );
    expect(document.body).toBeTruthy();
  });

  it("should render form label", () => {
    render(
      <ArtworkThumbnailInput
        formik={mockFormik}
        isEdit={false}
        label="Upload Thumbnail"
      />
    );
    expect(screen.getByText("Upload Thumbnail")).toBeTruthy();
  });

  it("should render error asterisk", () => {
    render(
      <ArtworkThumbnailInput
        formik={mockFormik}
        isEdit={false}
        label="Thumbnail"
      />
    );
    expect(screen.getByTestId("error-asterisk")).toBeTruthy();
  });

  it("should handle edit mode with artwork ID", () => {
    render(
      <ArtworkThumbnailInput
        artworkId={123}
        formik={mockFormik}
        isEdit={true}
        label="Thumbnail"
      />
    );
    expect(document.body).toBeTruthy();
  });
});
