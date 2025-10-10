import React from "react";
import { render, screen } from "@testing-library/react";

import ArtworkImagesInput from "../ArtworkImagesInput";

// Mock the hook
jest.mock("../useArtworkImagesInput", () => ({
  __esModule: true,
  default: () => ({
    handleFileChange: jest.fn(),
    handleRemoveImage: jest.fn(),
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
  values: {
    other_pictures: [],
  },
  errors: {},
  touched: {},
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  setFieldValue: jest.fn(),
};

describe("ArtworkImagesInput", () => {
  it("should render without crashing", () => {
    render(
      <ArtworkImagesInput
        formik={mockFormik}
        isEdit={false}
        label="Test Label"
      />
    );
    expect(document.body).toBeTruthy();
  });

  it("should render form label", () => {
    render(
      <ArtworkImagesInput
        formik={mockFormik}
        isEdit={false}
        label="Upload Images"
      />
    );
    expect(screen.getByText("Upload Images")).toBeTruthy();
  });

  it("should render file input", () => {
    render(
      <ArtworkImagesInput
        formik={mockFormik}
        isEdit={false}
        label="Test Label"
      />
    );

    const fileInput = screen.getByDisplayValue("");
    expect(fileInput).toBeTruthy();
    expect(fileInput.getAttribute("type")).toBe("file");
  });

  it("should render error asterisk", () => {
    render(
      <ArtworkImagesInput
        formik={mockFormik}
        isEdit={false}
        label="Test Label"
      />
    );
    expect(screen.getByTestId("error-asterisk")).toBeTruthy();
  });

  it("should render images when other_pictures has content", () => {
    const formikWithImages = {
      ...mockFormik,
      values: {
        other_pictures: ["image1.jpg", "image2.jpg"],
      },
    };

    render(
      <ArtworkImagesInput
        formik={formikWithImages}
        isEdit={false}
        label="Test Label"
      />
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  it("should show error message when formik has errors", () => {
    const formikWithErrors = {
      ...mockFormik,
      errors: {
        other_pictures: "Images are required",
      },
    };

    render(
      <ArtworkImagesInput
        formik={formikWithErrors}
        isEdit={false}
        label="Test Label"
      />
    );

    expect(screen.getByText("Images are required")).toBeTruthy();
  });

  it("should handle edit mode with artwork ID", () => {
    render(
      <ArtworkImagesInput
        artworkId={123}
        formik={mockFormik}
        isEdit={true}
        label="Test Label"
      />
    );
    expect(document.body).toBeTruthy();
  });

  it("should render input group with icon", () => {
    const { container } = render(
      <ArtworkImagesInput
        formik={mockFormik}
        isEdit={false}
        label="Test Label"
      />
    );

    const inputGroup = container.querySelector(".input-group");
    const inputGroupText = container.querySelector(".input-group-text");

    expect(inputGroup).toBeTruthy();
    expect(inputGroupText).toBeTruthy();
  });
});
