import React from "react";
import { renderHook } from "@testing-library/react";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";

import useContactForm from "../useContactForm";

// Mock dependencies
jest.mock("@/fetching/messages", () => ({
  sendMessage: jest.fn(),
}));

jest.mock("@/hooks/useValidationSchemas", () => ({
  useContactSchema: jest.fn(() => ({})),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider>{children}</I18nProvider>
);

describe("useContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return contact form properties", () => {
    const { result } = renderHook(() => useContactForm(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.t).toBe("function");
    expect(result.current.form).toBeDefined();
    expect(result.current.contactUsSchema).toBeDefined();
    expect(typeof result.current.onSubmit).toBe("function");
    expect(typeof result.current.handleSubmitClick).toBe("function");
  });

  it("should provide initial form values", () => {
    const { result } = renderHook(() => useContactForm(), {
      wrapper: TestWrapper,
    });

    expect(result.current.initialValues).toEqual({
      email: "",
      title: "",
      message: "",
    });
  });

  it("should provide working translation function", () => {
    const { result } = renderHook(() => useContactForm(), {
      wrapper: TestWrapper,
    });

    const translationResult = result.current.t("test.key");
    expect(typeof translationResult).toBe("string");
  });
});
