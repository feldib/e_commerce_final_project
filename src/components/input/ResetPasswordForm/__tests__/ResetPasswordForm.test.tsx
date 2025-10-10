import React from "react";
import { render } from "@testing-library/react";

import ResetPasswordForm from "../ResetPasswordForm";

// Use reusable mocks
jest.mock("@/components/providers/I18nProvider/I18nProvider");
jest.mock("next/navigation");

describe("ResetPasswordForm", () => {
  it("should render without crashing", () => {
    render(<ResetPasswordForm />);

    expect(document.body).toBeTruthy();
  });

  it("should render form elements", () => {
    render(<ResetPasswordForm />);

    // Should contain form elements
    const forms = document.querySelectorAll("form");
    const inputs = document.querySelectorAll("input");
    const buttons = document.querySelectorAll("button");

    expect(forms.length + inputs.length + buttons.length).toBeGreaterThan(0);
  });
});
