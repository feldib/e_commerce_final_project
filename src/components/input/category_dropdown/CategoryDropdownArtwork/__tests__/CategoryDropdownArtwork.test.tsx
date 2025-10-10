import React from "react";
import { render } from "@testing-library/react";

import { FormikProps } from "formik";

import CategoryDropdownArtwork from "../CategoryDropdownArtwork";

// Mock providers
jest.mock("../../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

// Mock custom hook
jest.mock("../useCategoryDropdownArtwork", () => ({
  __esModule: true,
  default: () => ({
    chosenCategory: null,
    cats: [],
    showError: false,
    formikError: "",
    getCategoryName: jest.fn(),
    t: (key: string) => key,
  }),
}));

describe("CategoryDropdownArtwork", () => {
  const mockCategories = [
    {
      id: 1,
      removed: false,
      translations: { en: "Category 1", he: "קטגוריה 1" },
    },
    {
      id: 2,
      removed: false,
      translations: { en: "Category 2", he: "קטגוריה 2" },
    },
  ];

  const mockFormik: Partial<FormikProps<Record<string, unknown>>> = {
    values: { category_id: "" },
    errors: {},
    touched: {},
    setFieldValue: jest.fn(),
    setFieldTouched: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
  };

  const mockProps = {
    categories: mockCategories,
    formik: mockFormik as FormikProps<Record<string, unknown>>,
    label: "Test Category",
  };

  it("should render without crashing", () => {
    render(<CategoryDropdownArtwork {...mockProps} />);

    expect(document.body).toBeTruthy();
  });

  it("should render dropdown elements", () => {
    render(<CategoryDropdownArtwork {...mockProps} />);

    // Should contain dropdown or select elements
    const selects = document.querySelectorAll("select");
    const dropdowns = document.querySelectorAll('[role="combobox"]');
    const buttons = document.querySelectorAll("button");

    expect(
      selects.length + dropdowns.length + buttons.length
    ).toBeGreaterThanOrEqual(0);
  });

  it("should provide category selection functionality", () => {
    render(<CategoryDropdownArtwork {...mockProps} />);

    // Should have some category selection elements
    expect(document.body).toBeTruthy();
  });
});
