import React from "react";
import { render, screen } from "@testing-library/react";

import LeaveReview from "../LeaveReview";

// Use reusable mocks
jest.mock("@/fetching/reviews");
jest.mock("@/components/providers/I18nProvider/I18nProvider");
jest.mock("@/components/providers/UserDataProvider/UserDataProvider");
jest.mock("@/components/input/ErrorAsterisk/ErrorAsterisk");
jest.mock("@/components/input/InputComponent/InputComponent");

// Mock Formik (specific to this component)
jest.mock("formik", () => ({
  Formik: ({ children }: { children: (props: unknown) => React.ReactNode }) =>
    children({
      errors: {},
      touched: {},
      values: { title: "", review_text: "" },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      handleSubmit: jest.fn(),
    }),
  Form: ({ children, ...props }: { children: React.ReactNode }) => (
    <form {...props}>{children}</form>
  ),
  Field: ({
    name,
    as,
    ...props
  }: {
    name: string;
    as?: string;
    [key: string]: unknown;
  }) => {
    const Component = as || "input";
    return React.createElement(Component, { name, ...props });
  },
  ErrorMessage: ({ name }: { name: string }) => (
    <div data-testid={`error-${name}`}>{`Error for ${name}`}</div>
  ),
}));

jest.mock("@/utils/toastUtils", () => ({
  showReviewSavedSuccessToast: jest.fn(),
  showReviewSaveErrorToast: jest.fn(),
}));

jest.mock("@/helpers/formValidationHelpers", () => ({
  createHandleSubmitClick: () => jest.fn(),
}));

jest.mock("@/hooks/useValidationSchemas", () => ({
  useReviewSchema: () => ({}),
}));

describe("LeaveReview", () => {
  const defaultProps = {
    artwork_id: 1,
  };

  it("should render without crashing", () => {
    render(<LeaveReview {...defaultProps} />);
    expect(document.body).toBeTruthy();
  });

  it("should render review form when user is logged in", () => {
    render(<LeaveReview {...defaultProps} />);

    expect(screen.getByText("components.leave_review.add_review")).toBeTruthy();
    expect(screen.getByTestId("input-component-title")).toBeTruthy();
  });

  it("should render form fields", () => {
    render(<LeaveReview {...defaultProps} />);

    expect(screen.getByText("common.fields.message")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /components.leave_review.submit/i })
    ).toBeTruthy();
  });

  it("should render floating element container", () => {
    const { container } = render(<LeaveReview {...defaultProps} />);

    const floatingElement = container.querySelector(".floating-element");
    expect(floatingElement).toBeTruthy();
  });

  it("should handle different artwork_id props", () => {
    render(<LeaveReview artwork_id={999} />);
    expect(document.body).toBeTruthy();
  });

  it("should render textarea for review text", () => {
    const { container } = render(<LeaveReview {...defaultProps} />);

    const textarea = container.querySelector("textarea");
    expect(textarea).toBeTruthy();
  });
});
