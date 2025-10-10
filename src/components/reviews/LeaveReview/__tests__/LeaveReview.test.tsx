import React from "react";
import { render, screen } from "@testing-library/react";

import LeaveReview from "../LeaveReview";

// Mock Formik
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

// Mock dependencies
jest.mock("@/components/providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

// Mock UserDataProvider context
const mockContextValue = {
  loggedIn: true,
  user: {},
  setUser: jest.fn(),
  setLoggedIn: jest.fn(),
  setLoading: jest.fn(),
  loading: false,
};

jest.mock("@/components/providers/UserDataProvider/UserDataProvider", () => ({
  UserDataContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({
      children,
    }: {
      children: (value: unknown) => React.ReactNode;
    }) => children(mockContextValue),
  },
}));

// Mock React.useContext to return our mock value
jest.spyOn(React, "useContext").mockReturnValue(mockContextValue);

jest.mock("@/components/input/ErrorAsterisk/ErrorAsterisk", () => {
  return function MockErrorAsterisk() {
    return <div data-testid="error-asterisk">ErrorAsterisk</div>;
  };
});

jest.mock("@/components/input/InputComponent/InputComponent", () => {
  return function MockInputComponent({ name }: { name: string }) {
    return <div data-testid={`input-component-${name}`}>InputComponent</div>;
  };
});

jest.mock("@/fetching/reviews", () => ({
  leaveReview: jest.fn(() => Promise.resolve()),
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
